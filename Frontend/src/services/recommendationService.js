// src/services/recommendationService.js
import productService from './product.service';

// Cache to store all products
let productsCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to get all products with caching
const getAllProducts = async () => {
  const now = new Date().getTime();
  
  // If cache is valid, use it
  if (productsCache && lastFetchTime && (now - lastFetchTime < CACHE_DURATION)) {
    return productsCache;
  }
  
  // Otherwise fetch fresh data
  try {
    const products = await productService.getAllProducts();
    productsCache = products;
    lastFetchTime = now;
    return products;
  } catch (error) {
    console.error('Error fetching products for recommendations:', error);
    // Return empty array or cached data if available as fallback
    return productsCache || [];
  }
};

// Get recommendations based on the current product
export const getRecommendations = async (currentProduct, limit = 4) => {
  const allProducts = await getAllProducts();
  
  // Don't recommend the current product
  const otherProducts = allProducts.filter(product => product.id !== currentProduct.id);
  
  // Recommendation strategies:
  // 1. Same category
  const sameCategoryProducts = otherProducts.filter(
    product => product.category === currentProduct.category
  );
  
  // 2. Similar price range (±20%)
  const currentPrice = currentProduct.isDiscounted 
    ? currentProduct.discountPrice 
    : currentProduct.price;
  
  const priceLowerBound = currentPrice * 0.8;
  const priceUpperBound = currentPrice * 1.2;
  
  const similarPriceProducts = otherProducts.filter(product => {
    const productPrice = product.isDiscounted ? product.discountPrice : product.price;
    return productPrice >= priceLowerBound && productPrice <= priceUpperBound;
  });
  
  // 3. Products with shared tags
  const productsWithSharedTags = otherProducts.filter(product => {
    return product.tags && currentProduct.tags && 
      product.tags.some(tag => currentProduct.tags.includes(tag));
  });
  
  // Combine and score recommendations
  const scoredRecommendations = otherProducts.map(product => {
    let score = 0;
    
    // Same category is a strong signal
    if (product.category === currentProduct.category) {
      score += 5;
    }
    
    // Similar price range
    const productPrice = product.isDiscounted ? product.discountPrice : product.price;
    if (productPrice >= priceLowerBound && productPrice <= priceUpperBound) {
      score += 3;
    }
    
    // Shared tags
    if (product.tags && currentProduct.tags) {
      const sharedTagsCount = product.tags.filter(tag => 
        currentProduct.tags.includes(tag)
      ).length;
      
      score += sharedTagsCount * 2;
    }
    
    // If both are on discount, that's also a signal
    if (product.isDiscounted && currentProduct.isDiscounted) {
      score += 2;
    }
    
    return { product, score };
  });
  
  // Sort by score (highest first) and take the top recommendations
  const topRecommendations = scoredRecommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.product);
  
  return topRecommendations;
};

// Get frequently bought together items
export const getFrequentlyBoughtTogether = async (currentProduct, limit = 3) => {
  const allProducts = await getAllProducts();
  const recommendations = [];
  
  // For fruits and vegetables, recommend complementary items
  if (currentProduct.category === 'fruitsVeggies') {
    // If it's a fruit, recommend other fruits or snacks
    if (currentProduct.tags && currentProduct.tags.includes('fruit')) {
      const otherFruits = allProducts.filter(p => 
        p.id !== currentProduct.id && 
        p.tags && 
        p.tags.includes('fruit')
      ).slice(0, 1);
      
      const snacks = allProducts.filter(p => p.category === 'snacks').slice(0, 1);
      const drinks = allProducts.filter(p => 
        p.category === 'coldDrinks' && 
        p.tags && p.tags.includes('healthy')
      ).slice(0, 1);
      
      recommendations.push(...otherFruits, ...snacks, ...drinks);
    } 
    // If it's a vegetable, recommend complementary vegetables or dairy
    else {
      const otherVeggies = allProducts.filter(p => 
        p.id !== currentProduct.id && 
        p.category === 'fruitsVeggies' && 
        p.tags && 
        !p.tags.includes('fruit')
      ).slice(0, 1);
      
      const dairy = allProducts.filter(p => p.category === 'dairyProducts').slice(0, 1);
      const drinks = allProducts.filter(p => p.category === 'coldDrinks').slice(0, 1);
      
      recommendations.push(...otherVeggies, ...dairy, ...drinks);
    }
  }
  
  // For snacks, recommend drinks
  else if (currentProduct.category === 'snacks') {
    const drinks = allProducts.filter(p => p.category === 'coldDrinks').slice(0, 2);
    const otherSnacks = allProducts.filter(p => 
      p.category === 'snacks' && p.id !== currentProduct.id
    ).slice(0, 1);
    
    recommendations.push(...drinks, ...otherSnacks);
  }
  
  // For cold drinks, recommend snacks
  else if (currentProduct.category === 'coldDrinks') {
    const snacks = allProducts.filter(p => p.category === 'snacks').slice(0, 2);
    const otherDrinks = allProducts.filter(p => 
      p.category === 'coldDrinks' && p.id !== currentProduct.id
    ).slice(0, 1);
    
    recommendations.push(...snacks, ...otherDrinks);
  }
  
  // For dairy products, recommend fruits or snacks
  else if (currentProduct.category === 'dairyProducts') {
    const fruits = allProducts.filter(p => 
      p.category === 'fruitsVeggies' && 
      p.tags && p.tags.includes('fruit')
    ).slice(0, 1);
    
    const otherDairy = allProducts.filter(p => 
      p.category === 'dairyProducts' && p.id !== currentProduct.id
    ).slice(0, 1);
    
    const snacks = allProducts.filter(p => p.category === 'snacks').slice(0, 1);
    
    recommendations.push(...fruits, ...otherDairy, ...snacks);
  }
  
  // If we couldn't find enough recommendations, add some generic ones
  if (recommendations.length < limit) {
    const remaining = limit - recommendations.length;
    
    const otherProducts = allProducts
      .filter(p => 
        p.id !== currentProduct.id && 
        !recommendations.some(r => r.id === p.id)
      )
      .slice(0, remaining);
    
    recommendations.push(...otherProducts);
  }
  
  return recommendations.slice(0, limit);
};

// Get trending products
export const getTrendingProducts = async (limit = 4) => {
  const allProducts = await getAllProducts();
  
  // In a real app, this would be based on actual sales/views data
  // For demo purposes, we'll just select a mix of products
  
  // Get some products from each category
  const fruitsVeggies = allProducts.filter(p => p.category === 'fruitsVeggies' && p.isDiscounted).slice(0, 1);
  const snacks = allProducts.filter(p => p.category === 'snacks' && p.isDiscounted).slice(0, 1);
  const coldDrinks = allProducts.filter(p => p.category === 'coldDrinks').slice(0, 1);
  const dairyProducts = allProducts.filter(p => p.category === 'dairyProducts').slice(0, 1);
  
  const trending = [...fruitsVeggies, ...snacks, ...coldDrinks, ...dairyProducts];
  
  return trending.slice(0, limit);
};

export default {
  getRecommendations,
  getFrequentlyBoughtTogether,
  getTrendingProducts
};