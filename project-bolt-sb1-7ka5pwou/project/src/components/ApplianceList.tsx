import React from 'react';
import { Trash2, Edit3, Zap, Calendar, Activity, TrendingUp, Star, Award, BarChart3 } from 'lucide-react';
import { Appliance } from '../types';

interface ApplianceListProps {
  appliances: Appliance[];
  onDeleteAppliance: (id: string) => void;
  onEditAppliance: (appliance: Appliance) => void;
}

const ApplianceList: React.FC<ApplianceListProps> = ({ appliances, onDeleteAppliance, onEditAppliance }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      Kitchen: 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg',
      Lighting: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg',
      Entertainment: 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg',
      'Cooling/Heating': 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg',
      Laundry: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg',
      Computing: 'bg-gradient-to-r from-gray-400 to-slate-500 text-white shadow-lg',
      Bathroom: 'bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-lg',
      Security: 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg',
      'Garden/Outdoor': 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg',
      Other: 'bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow-lg',
    };
    return colors[category as keyof typeof colors] || colors.Other;
  };

  const getEfficiencyRating = (appliance: Appliance) => {
    const dailyConsumption = (appliance.powerRating * appliance.dailyUsage) / 1000;
    if (dailyConsumption < 1) return { rating: 'A+', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (dailyConsumption < 3) return { rating: 'A', color: 'text-green-500', bgColor: 'bg-green-50' };
    if (dailyConsumption < 5) return { rating: 'B', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (dailyConsumption < 8) return { rating: 'C', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { rating: 'D', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  if (appliances.length === 0) {
    return (
      <div className="glass rounded-3xl shadow-strong p-16 text-center border border-white/30 backdrop-blur-xl animate-fadeInUp">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-soft">
          <Zap className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">No Appliances Added</h3>
        <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">Add your first appliance to start tracking energy consumption and get personalized insights</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl shadow-strong border border-white/30 overflow-hidden backdrop-blur-xl animate-fadeInUp">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-slate-800 via-gray-900 to-black p-8 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative flex items-center space-x-4">
          <div className="glass-dark p-3 rounded-2xl backdrop-blur-sm border border-white/20 shadow-soft">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white text-shadow-strong">Your Appliances</h3>
            <div className="flex items-center space-x-4 mt-2">
              <p className="text-gray-300 text-base font-medium">{appliances.length} appliances tracked</p>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-semibold">Smart Monitoring Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Appliances List */}
      <div className="p-8 space-y-6">
        {appliances.map((appliance, index) => {
          const dailyConsumption = (appliance.powerRating * appliance.dailyUsage) / 1000;
          const monthlyConsumption = (dailyConsumption * appliance.daysPerMonth);
          const efficiency = getEfficiencyRating(appliance);
          
          return (
            <div
              key={appliance.id}
              className="group relative glass rounded-3xl p-8 border border-gray-200/50 shadow-soft hover:shadow-strong transition-all duration-500 card-hover animate-scaleIn backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Enhanced background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-50 to-cyan-50 rounded-full -ml-16 -mb-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h4 className="font-bold text-gray-900 text-xl">{appliance.name}</h4>
                      <span className={`px-4 py-2 rounded-2xl text-sm font-bold ${getCategoryColor(appliance.category)}`}>
                        {appliance.category}
                      </span>
                      <div className={`px-3 py-1 rounded-xl text-xs font-bold ${efficiency.bgColor} ${efficiency.color} border border-current/20`}>
                        <div className="flex items-center space-x-1">
                          <Award className="h-3 w-3" />
                          <span>Efficiency: {efficiency.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200/50 shadow-soft">
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Power</span>
                        </div>
                        <p className="text-lg font-bold text-blue-900">{appliance.powerRating}W</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200/50 shadow-soft">
                        <div className="flex items-center space-x-2 mb-2">
                          <Activity className="h-4 w-4 text-green-600" />
                          <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Usage</span>
                        </div>
                        <p className="text-lg font-bold text-green-900">{appliance.dailyUsage}h/day</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-4 border border-purple-200/50 shadow-soft">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">Days</span>
                        </div>
                        <p className="text-lg font-bold text-purple-900">{appliance.daysPerMonth}/month</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200/50 shadow-soft">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-amber-600" />
                          <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Daily</span>
                        </div>
                        <p className="text-lg font-bold text-amber-900">{dailyConsumption.toFixed(2)} Units</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-200/50 shadow-soft">
                        <div className="flex items-center space-x-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-rose-600" />
                          <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">Monthly</span>
                        </div>
                        <p className="text-lg font-bold text-rose-900">{monthlyConsumption.toFixed(1)} Units</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Action Buttons */}
                  <div className="flex items-center space-x-3 ml-8">
                    <button 
                      onClick={() => onEditAppliance(appliance)}
                      className="group/edit btn-hover ripple p-4 text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-300 border border-blue-200 hover:border-blue-300 shadow-soft hover:shadow-medium"
                      title="Edit appliance details"
                    >
                      <Edit3 className="h-5 w-5 group-hover/edit:rotate-12 transition-transform duration-300" />
                    </button>
                    <button
                      onClick={() => onDeleteAppliance(appliance.id)}
                      className="group/delete btn-hover ripple p-4 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 border border-red-200 hover:border-red-300 shadow-soft hover:shadow-medium"
                      title="Delete appliance"
                    >
                      <Trash2 className="h-5 w-5 group-hover/delete:rotate-12 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplianceList;