// src/components/admin/SalesReport.jsx
import { useState, useEffect } from 'react';
import adminService from '../../services/admin.service';

const SalesReport = () => {
  const [reportData, setReportData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Date range for report
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  
  // Forecast type
  const [forecastType, setForecastType] = useState('weekly');
  
  // Colors for charts
  const colors = [
    '#4CAF50', // Green
    '#2196F3', // Blue
    '#FFC107', // Yellow
    '#FF5722', // Deep Orange
    '#9C27B0', // Purple
    '#795548', // Brown
    '#607D8B', // Blue Grey
  ];
  
  const generateReport = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await adminService.getSalesReport(startDate, endDate);
      setReportData(data);
      
      setLoading(false);
    } catch (err) {
      console.error('Error generating report:', err);
      setError('Failed to generate report. Please try again.');
      setLoading(false);
    }
  };
  
  const generateForecast = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await adminService.getSalesForecast(forecastType);
      setForecastData(data);
      
      setLoading(false);
    } catch (err) {
      console.error('Error generating forecast:', err);
      setError('Failed to generate forecast. Please try again.');
      setLoading(false);
    }
  };
  
  // Load initial data
  useEffect(() => {
    generateReport();
    generateForecast();
  }, []);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Sales Reports</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Sales Report Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Report</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
          
          <button
            onClick={generateReport}
            disabled={loading}
            className="mb-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
          
          {reportData && (
            <div className="mt-4">
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Time Period</p>
                    <p className="font-medium">
                      {formatDate(reportData.startDate)} - {formatDate(reportData.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="font-medium">{reportData.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <p className="font-medium">{formatCurrency(reportData.totalSales)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average Order Value</p>
                    <p className="font-medium">
                      {formatCurrency(reportData.totalSales / reportData.totalOrders)}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Sales by Category */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-2">Sales by Category</h4>
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          % of Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(reportData.salesByCategory).map(([category, amount], index) => (
                        <tr key={category} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: colors[index % colors.length] }}
                            ></div>
                            {category}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                            {formatCurrency(amount)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                            {((amount / reportData.totalSales) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Sales by Product */}
              <div>
                <h4 className="text-md font-semibold mb-2">Top Products</h4>
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          % of Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(reportData.salesByProduct)
                        .sort((a, b) => b[1] - a[1]) // Sort by sales amount (descending)
                        .slice(0, 5) // Take top 5
                        .map(([product, amount], index) => (
                          <tr key={product} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {product}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                              {formatCurrency(amount)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                              {((amount / reportData.totalSales) * 100).toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Sales Forecast Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Forecast</h3>
          
          <div className="mb-4">
            <label htmlFor="forecastType" className="block text-sm font-medium text-gray-700 mb-1">
              Forecast Type
            </label>
            <select
              id="forecastType"
              value={forecastType}
              onChange={(e) => setForecastType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
          
          <button
            onClick={generateForecast}
            disabled={loading}
            className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Forecast'}
          </button>
          
          {forecastData && (
            <div className="mt-4">
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Forecast Date</p>
                    <p className="font-medium">
                      {formatDate(forecastData.forecastDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Forecast Type</p>
                    <p className="font-medium">{forecastData.forecastType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Predicted Total</p>
                    <p className="font-medium">{formatCurrency(forecastData.predictedTotal)}</p>
                  </div>
                </div>
              </div>
              
              {/* Forecast by Category */}
              <div>
                <h4 className="text-md font-semibold mb-2">Forecast by Category</h4>
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Predicted Amount
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          % of Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(forecastData.forecastByCategory).map(([category, amount], index) => (
                        <tr key={category} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: colors[index % colors.length] }}
                            ></div>
                            {category}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                            {formatCurrency(amount)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                            {((amount / forecastData.predictedTotal) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Data Processing Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Data Processing</h3>
        <p className="text-gray-600 mb-4">
          Manually process sales data to update reports and forecasts. This is normally done automatically on a scheduled basis.
        </p>
        <button
          onClick={async () => {
            try {
              setLoading(true);
              await adminService.processSalesData();
              alert('Sales data processed successfully!');
              
              // Refresh reports and forecasts
              await generateReport();
              await generateForecast();
              
              setLoading(false);
            } catch (err) {
              console.error('Error processing sales data:', err);
              setError('Failed to process sales data. Please try again.');
              setLoading(false);
            }
          }}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Process Sales Data'}
        </button>
      </div>
    </div>
  );
};

export default SalesReport;