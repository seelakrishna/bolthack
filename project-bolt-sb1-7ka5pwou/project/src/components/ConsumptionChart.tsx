import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Appliance, PredictionData } from '../types';
import { BarChart3, TrendingUp, Sparkles, Activity, Calendar, Zap, IndianRupee, Eye, EyeOff, Star, Award } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ConsumptionChartProps {
  appliances: Appliance[];
  predictions: PredictionData[];
}

const ConsumptionChart: React.FC<ConsumptionChartProps> = ({ appliances, predictions }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Enhanced color palette with gradients
  const colors = [
    { bg: 'rgba(99, 102, 241, 0.8)', border: 'rgba(99, 102, 241, 1)' },
    { bg: 'rgba(34, 197, 94, 0.8)', border: 'rgba(34, 197, 94, 1)' },
    { bg: 'rgba(251, 191, 36, 0.8)', border: 'rgba(251, 191, 36, 1)' },
    { bg: 'rgba(239, 68, 68, 0.8)', border: 'rgba(239, 68, 68, 1)' },
    { bg: 'rgba(168, 85, 247, 0.8)', border: 'rgba(168, 85, 247, 1)' },
    { bg: 'rgba(59, 130, 246, 0.8)', border: 'rgba(59, 130, 246, 1)' },
    { bg: 'rgba(16, 185, 129, 0.8)', border: 'rgba(16, 185, 129, 1)' },
    { bg: 'rgba(245, 101, 101, 0.8)', border: 'rgba(245, 101, 101, 1)' },
    { bg: 'rgba(139, 92, 246, 0.8)', border: 'rgba(139, 92, 246, 1)' },
    { bg: 'rgba(6, 182, 212, 0.8)', border: 'rgba(6, 182, 212, 1)' },
  ];

  const applianceData = {
    labels: appliances.map(a => a.name),
    datasets: [
      {
        label: 'Monthly Consumption (Units)',
        data: appliances.map(a => ((a.powerRating * a.dailyUsage) / 1000) * a.daysPerMonth),
        backgroundColor: colors.map(c => c.bg),
        borderColor: colors.map(c => c.border),
        borderWidth: 3,
        borderRadius: 12,
        borderSkipped: false,
      },
    ],
  };

  const predictionData = {
    labels: predictions.map(p => {
      const date = new Date(p.date);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
      } else if (date.getDate() === today.getDate() + 2) {
        return 'Day After';
      } else {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      }
    }),
    datasets: [
      {
        label: 'Predicted Consumption (Units)',
        data: predictions.map(p => p.predicted),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 4,
        pointRadius: 10,
        pointHoverRadius: 14,
        borderWidth: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        cornerRadius: 16,
        displayColors: false,
        padding: 20,
        titleFont: {
          size: 16,
          weight: '700',
        },
        bodyFont: {
          size: 14,
          weight: '600',
        },
        callbacks: {
          title: function(context: any) {
            return `${context[0].label}`;
          },
          label: function(context: any) {
            return `Expected: ${context.parsed.y.toFixed(1)} units`;
          },
          afterLabel: function(context: any) {
            const cost = context.parsed.y * 6.5;
            return `Estimated cost: ₹${cost.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(16, 185, 129, 0.1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 14,
            weight: '600',
          },
          color: '#10B981',
          callback: function(value: any) {
            return value + ' units';
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            weight: '600',
          },
          color: '#374151',
        },
      },
    },
  };

  // Calculate forecast insights
  const totalForecastConsumption = predictions.reduce((sum, p) => sum + p.predicted, 0);
  const avgDailyConsumption = totalForecastConsumption / predictions.length;
  const estimatedWeeklyCost = totalForecastConsumption * 6.5;
  const highestDay = predictions.reduce((max, p) => p.predicted > max.predicted ? p : max, predictions[0]);
  const lowestDay = predictions.reduce((min, p) => p.predicted < min.predicted ? p : min, predictions[0]);

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else if (date.getDate() === today.getDate() + 2) {
      return 'Day After Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Enhanced Monthly Consumption Chart */}
      <div className="glass rounded-3xl shadow-strong border border-gray-100/50 overflow-hidden backdrop-blur-xl animate-slideInLeft">
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative flex items-center space-x-4">
            <div className="glass-dark p-3 rounded-2xl backdrop-blur-sm border border-white/30 shadow-soft">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white text-shadow-strong">Monthly Consumption</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Award className="h-4 w-4 text-indigo-200" />
                <p className="text-indigo-100 text-base font-medium">Appliance breakdown analysis</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {appliances.length > 0 ? (
            <div className="h-80">
              <Bar data={applianceData} options={chartOptions} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-80 text-gray-500">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-soft">
                <BarChart3 className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-center text-lg font-medium">Add appliances to see consumption breakdown</p>
            </div>
          )}
          <div className="mt-6 glass rounded-2xl p-4 border border-blue-200/50 shadow-soft">
            <div className="flex items-center space-x-3 text-blue-700">
              <Activity className="h-5 w-5" />
              <p className="font-semibold">Shows actual monthly consumption based on days used per month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced 7-Day Forecast */}
      <div className="glass rounded-3xl shadow-strong border border-gray-100/50 overflow-hidden backdrop-blur-xl animate-slideInRight">
        <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="glass-dark p-3 rounded-2xl backdrop-blur-sm border border-white/30 shadow-soft">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white text-shadow-strong">7-Day Smart Forecast</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Sparkles className="h-4 w-4 text-emerald-200" />
                  <p className="text-emerald-100 text-base font-medium">AI-powered energy predictions</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="btn-hover glass-dark text-white px-4 py-3 rounded-2xl border border-white/30 shadow-soft ripple"
            >
              <div className="flex items-center space-x-2">
                {showDetails ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                <span className="font-semibold">{showDetails ? 'Hide' : 'Show'} Details</span>
              </div>
            </button>
          </div>
        </div>
        
        <div className="p-8">
          {/* Enhanced Chart */}
          <div className="h-64 mb-8">
            <Line data={predictionData} options={chartOptions} />
          </div>

          {/* Enhanced Quick Insights */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="glass rounded-2xl p-6 border border-green-200/50 shadow-soft">
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="h-5 w-5 text-green-600" />
                <span className="text-sm font-bold text-green-700 uppercase tracking-wide">Avg Daily</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{avgDailyConsumption.toFixed(1)} units</p>
            </div>
            
            <div className="glass rounded-2xl p-6 border border-blue-200/50 shadow-soft">
              <div className="flex items-center space-x-3 mb-3">
                <IndianRupee className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">Week Cost</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">₹{estimatedWeeklyCost.toFixed(2)}</p>
            </div>
          </div>

          {/* Enhanced Detailed Insights */}
          {showDetails && (
            <div className="space-y-6 animate-fadeInUp">
              <div className="glass rounded-2xl p-6 border border-amber-200/50 shadow-soft">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                  <span className="text-base font-bold text-amber-700 uppercase tracking-wide">Peak & Low Days</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4 border border-amber-200/30 shadow-soft">
                    <p className="text-xs text-amber-600 font-bold mb-2 uppercase tracking-wide">Highest Usage</p>
                    <p className="text-base font-bold text-amber-900">{getDayName(highestDay.date)}</p>
                    <p className="text-sm text-amber-700 font-semibold">{highestDay.predicted.toFixed(1)} units</p>
                  </div>
                  <div className="glass rounded-xl p-4 border border-amber-200/30 shadow-soft">
                    <p className="text-xs text-amber-600 font-bold mb-2 uppercase tracking-wide">Lowest Usage</p>
                    <p className="text-base font-bold text-amber-900">{getDayName(lowestDay.date)}</p>
                    <p className="text-sm text-amber-700 font-semibold">{lowestDay.predicted.toFixed(1)} units</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Daily Breakdown */}
              <div className="glass rounded-2xl p-6 border border-purple-200/50 shadow-soft">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span className="text-base font-bold text-purple-700 uppercase tracking-wide">Daily Breakdown</span>
                </div>
                <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                  {predictions.map((prediction, index) => (
                    <div key={index} className="glass rounded-xl p-4 border border-purple-200/30 shadow-soft">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-purple-900">
                          {getDayName(prediction.date)}
                        </span>
                        <div className="flex items-center space-x-4">
                          <span className="text-base font-bold text-purple-900">
                            {prediction.predicted.toFixed(1)} units
                          </span>
                          <span className="text-sm text-purple-600 font-semibold">
                            ₹{(prediction.predicted * 6.5).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced AI Info */}
          <div className="mt-8 glass rounded-2xl p-6 border border-green-200/50 shadow-soft">
            <div className="flex items-center space-x-3 text-emerald-700">
              <Sparkles className="h-5 w-5" />
              <p className="font-bold text-base">
                Smart predictions based on your usage patterns, seasonal trends, and weather forecasts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionChart;