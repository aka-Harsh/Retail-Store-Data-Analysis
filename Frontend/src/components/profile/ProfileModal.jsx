import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../store/slices/userSlice';

const ProfileModal = ({ user, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    age: user.age,
    gender: user.gender,
    phone: user.phone,
  });
  
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-4 w-80 max-w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Profile Information</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-gray-700 mb-1 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="block text-gray-700 mb-1 text-sm">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="block text-gray-700 mb-1 text-sm">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label className="block text-gray-700 mb-1 text-sm">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-200 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-green-400 rounded-md text-sm"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-3">
              <p className="text-gray-600 mb-1 text-xs">Name</p>
              <p className="font-medium text-sm">{user.name}</p>
            </div>
            
            <div className="mb-3">
              <p className="text-gray-600 mb-1 text-xs">Age</p>
              <p className="font-medium text-sm">{user.age}</p>
            </div>
            
            <div className="mb-3">
              <p className="text-gray-600 mb-1 text-xs">Gender</p>
              <p className="font-medium text-sm">{user.gender}</p>
            </div>
            
            <div className="mb-3">
              <p className="text-gray-600 mb-1 text-xs">Phone</p>
              <p className="font-medium text-sm">{user.phone}</p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-green-400 rounded-md text-sm"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;