import React from 'react';
import { EnergyData } from '../types';
import { Zap, IndianRupee, Calendar, Sparkles, Activity, TrendingUp, BarChart3 } from 'lucide-react';

interface EnergyOverviewProps {
  energyData: EnergyData;
  tariffRate: number;
  onTariffChange: (rate: number) => void;
}

const EnergyOverview: React.FC<EnergyOverviewProps> = ({ energyData, tariffRate, onTariffChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Daily Consumption Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-strong hover:shadow-glow transition-all duration-500 card-hover animate-scaleIn">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-300 opacity-20 rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-blue-200" />
                <p className="text-blue-100 text-sm font-semibold tracking-wide uppercase">Daily Usage</p>
              </div>
              <p className="text-4xl font-bold tracking-tight mb-1">{energyData.dailyConsumption.toFixed(2)}</p>
              <p className="text-blue-200 text-lg font-medium">Units (kWh)</p>
            </div>
            <div className="glass-dark p-4 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <div className="glass-dark rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">Current consumption rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Consumption Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 rounded-3xl p-8 text-white shadow-strong hover:shadow-glow transition-all duration-500 card-hover animate-scaleIn animation-delay-100">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300 opacity-20 rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-green-200" />
                <p className="text-green-100 text-sm font-semibold tracking-wide uppercase">Monthly Usage</p>
              </div>
              <p className="text-4xl font-bold tracking-tight mb-1">{energyData.monthlyConsumption.toFixed(1)}</p>
              <p className="text-green-200 text-lg font-medium">Units (kWh)</p>
            </div>
            <div className="glass-dark p-4 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <div className="glass-dark rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-300" />
              <span className="text-green-200 text-sm font-medium">Projected for this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Cost Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-3xl p-8 text-white shadow-strong hover:shadow-glow transition-all duration-500 card-hover animate-scaleIn animation-delay-200">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-300 opacity-20 rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <IndianRupee className="h-4 w-4 text-orange-200" />
                <p className="text-orange-100 text-sm font-semibold tracking-wide uppercase">Daily Cost</p>
              </div>
              <p className="text-4xl font-bold tracking-tight mb-1">₹{energyData.dailyCost.toFixed(2)}</p>
              <p className="text-orange-200 text-lg font-medium">Per day</p>
            </div>
            <div className="glass-dark p-4 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <IndianRupee className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <div className="glass-dark rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-orange-100 text-sm font-medium">Rate per unit:</span>
              <div className="flex items-center space-x-2">
                <span className="text-orange-100 font-semibold">₹</span>
                <input
                  type="number"
                  step="0.1"
                  value={tariffRate}
                  onChange={(e) => onTariffChange(parseFloat(e.target.value))}
                  className="bg-white bg-opacity-30 text-white placeholder-orange-200 border-0 rounded-lg px-3 py-2 text-sm w-20 focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none font-semibold text-center backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Cost Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 rounded-3xl p-8 text-white shadow-strong hover:shadow-glow transition-all duration-500 card-hover animate-scaleIn animation-delay-300">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-300 opacity-20 rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-purple-200" />
                <p className="text-purple-100 text-sm font-semibold tracking-wide uppercase">Monthly Bill</p>
              </div>
              <p className="text-4xl font-bold tracking-tight mb-1">₹{energyData.monthlyCost.toFixed(2)}</p>
              <p className="text-purple-200 text-lg font-medium">Estimated</p>
            </div>
            <div className="glass-dark p-4 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <div className="relative">
                <IndianRupee className="h-10 w-10 text-white" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="glass-dark rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
              <span className="text-purple-200 text-sm font-medium">Projected monthly expense</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyOverview;