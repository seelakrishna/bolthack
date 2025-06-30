import React, { useState, useEffect } from 'react';
import { Plus, Zap, Search, Calendar, Sparkles, Filter, Edit3, X, Save, Star, Lightbulb } from 'lucide-react';
import { Appliance } from '../types';
import { getApplianceCategories, getTypicalPowerRatings, getAppliancesByCategory } from '../utils/calculations';

interface ApplianceFormProps {
  onAddAppliance: (appliance: Omit<Appliance, 'id'>) => void;
  editingAppliance?: Appliance | null;
  onUpdateAppliance?: (appliance: Appliance) => void;
  onCancelEdit?: () => void;
}

const ApplianceForm: React.FC<ApplianceFormProps> = ({ 
  onAddAppliance, 
  editingAppliance, 
  onUpdateAppliance, 
  onCancelEdit 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    powerRating: '',
    dailyUsage: '',
    daysPerMonth: '30',
    category: 'Kitchen',
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = getApplianceCategories();
  const typicalRatings = getTypicalPowerRatings();
  const appliancesByCategory = getAppliancesByCategory();

  // Populate form when editing
  useEffect(() => {
    if (editingAppliance) {
      setFormData({
        name: editingAppliance.name,
        powerRating: editingAppliance.powerRating.toString(),
        dailyUsage: editingAppliance.dailyUsage.toString(),
        daysPerMonth: editingAppliance.daysPerMonth.toString(),
        category: editingAppliance.category,
      });
      setShowForm(true);
    }
  }, [editingAppliance]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.powerRating || !formData.dailyUsage || !formData.daysPerMonth) return;

    const applianceData = {
      name: formData.name,
      powerRating: parseInt(formData.powerRating),
      dailyUsage: parseFloat(formData.dailyUsage),
      daysPerMonth: parseInt(formData.daysPerMonth),
      category: formData.category,
    };

    if (editingAppliance && onUpdateAppliance) {
      onUpdateAppliance({
        ...applianceData,
        id: editingAppliance.id,
      });
    } else {
      onAddAppliance(applianceData);
    }

    setFormData({ name: '', powerRating: '', dailyUsage: '', daysPerMonth: '30', category: 'Kitchen' });
    setShowForm(false);
    setSearchTerm('');
  };

  const handleCancel = () => {
    if (editingAppliance && onCancelEdit) {
      onCancelEdit();
    }
    setFormData({ name: '', powerRating: '', dailyUsage: '', daysPerMonth: '30', category: 'Kitchen' });
    setShowForm(false);
    setSearchTerm('');
  };

  const handleApplianceSelect = (appliance: string) => {
    const category = Object.keys(appliancesByCategory).find(cat => 
      appliancesByCategory[cat].includes(appliance)
    ) || 'Other';
    
    setFormData(prev => ({
      ...prev,
      name: appliance,
      powerRating: typicalRatings[appliance as keyof typeof typicalRatings]?.toString() || '',
      category: category,
    }));
    setSearchTerm('');
  };

  const getFilteredAppliances = () => {
    let appliances = Object.keys(typicalRatings);
    
    if (selectedCategory !== 'All') {
      appliances = appliancesByCategory[selectedCategory] || [];
    }
    
    if (searchTerm) {
      appliances = appliances.filter(appliance =>
        appliance.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return appliances.slice(0, 20);
  };

  const isEditing = !!editingAppliance;

  return (
    <div className="glass rounded-3xl shadow-strong border border-white/30 overflow-hidden backdrop-blur-xl animate-fadeInUp">
      {/* Enhanced Header */}
      <div className={`bg-gradient-to-br ${isEditing ? 'from-amber-500 via-orange-500 to-red-500' : 'from-indigo-500 via-purple-500 to-pink-500'} p-8 relative overflow-hidden`}>
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="glass-dark p-3 rounded-2xl backdrop-blur-sm border border-white/30 shadow-soft">
              {isEditing ? <Edit3 className="h-8 w-8 text-white" /> : <Zap className="h-8 w-8 text-white" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white text-shadow-strong">
                {isEditing ? `Edit ${editingAppliance?.name}` : 'Manage Appliances'}
              </h2>
              <p className={`${isEditing ? 'text-orange-100' : 'text-indigo-100'} text-base font-medium flex items-center space-x-2`}>
                <Star className="h-4 w-4" />
                <span>{isEditing ? 'Update appliance details and save changes' : 'Add and track your home appliances'}</span>
              </p>
            </div>
          </div>
          
          {/* Enhanced Action Button */}
          {!isEditing ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="group btn-hover glass-dark text-white px-6 py-3 rounded-2xl border border-white/30 shadow-soft ripple"
            >
              <div className="flex items-center space-x-3">
                <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-semibold">Add Appliance</span>
              </div>
            </button>
          ) : (
            <div className="glass-dark px-4 py-3 rounded-2xl border border-white/30 shadow-soft">
              <div className="flex items-center space-x-2">
                <Edit3 className="h-4 w-4 text-orange-200" />
                <span className="text-orange-100 text-sm font-semibold">Editing Mode</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {(showForm || isEditing) && (
        <div className="p-8 space-y-8">
          {/* Appliance Browser - Only show when not editing */}
          {!isEditing && (
            <div className="glass rounded-3xl p-8 border border-gray-200/50 shadow-soft animate-slideInLeft">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-3 rounded-2xl">
                  <Sparkles className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Browse Common Appliances</h3>
                  <p className="text-gray-600 text-sm">Select from our curated list of household appliances</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search appliances..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white shadow-soft text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-12 pr-8 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-soft appearance-none cursor-pointer text-gray-900"
                  >
                    <option value="All">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-80 overflow-y-auto custom-scrollbar">
                {getFilteredAppliances().map((appliance, index) => (
                  <button
                    key={appliance}
                    type="button"
                    onClick={() => handleApplianceSelect(appliance)}
                    className="group text-left p-4 bg-white rounded-2xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-gray-200 hover:border-indigo-300 shadow-soft hover:shadow-medium card-hover animate-scaleIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="font-semibold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors mb-2">
                      {appliance}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-3 w-3 text-indigo-600" />
                      <span className="text-indigo-600 text-xs font-bold">
                        {typicalRatings[appliance as keyof typeof typicalRatings]}W
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-8 animate-slideInRight">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700 flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-indigo-600" />
                  <span>Appliance Name</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white shadow-soft text-gray-900 placeholder-gray-500"
                  placeholder="e.g., Refrigerator"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700 flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-indigo-600" />
                  <span>Category</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-soft appearance-none cursor-pointer text-gray-900"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700 flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-indigo-600" />
                  <span>Power Rating (Watts)</span>
                </label>
                <div className="relative">
                  <Zap className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.powerRating}
                    onChange={(e) => setFormData(prev => ({ ...prev, powerRating: e.target.value }))}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white shadow-soft text-gray-900 placeholder-gray-500"
                    placeholder="150"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700 flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  <span>Daily Usage (Hours)</span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.dailyUsage}
                  onChange={(e) => setFormData(prev => ({ ...prev, dailyUsage: e.target.value }))}
                  className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white shadow-soft text-gray-900 placeholder-gray-500"
                  placeholder="8"
                  required
                  min="0"
                  max="24"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="block text-sm font-bold text-gray-700 flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  <span>Days Used Per Month</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.daysPerMonth}
                    onChange={(e) => setFormData(prev => ({ ...prev, daysPerMonth: e.target.value }))}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white shadow-soft text-gray-900 placeholder-gray-500"
                    placeholder="30"
                    required
                    min="1"
                    max="31"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span>How many days in a month do you use this appliance? (e.g., AC might be used only 25 days)</span>
                </p>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                className={`flex-1 btn-hover ripple flex items-center justify-center space-x-3 bg-gradient-to-r ${isEditing ? 'from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700' : 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'} text-white px-8 py-4 rounded-2xl transition-all duration-300 font-bold shadow-medium text-lg`}
              >
                {isEditing ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                <span>{isEditing ? 'Save Changes' : 'Add Appliance'}</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-hover ripple flex items-center justify-center space-x-3 px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-bold shadow-medium text-lg"
              >
                <X className="h-5 w-5" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ApplianceForm;