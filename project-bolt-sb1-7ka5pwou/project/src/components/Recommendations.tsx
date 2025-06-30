import React from 'react';
import { Lightbulb, AlertTriangle, Info, IndianRupee, Sparkles, TrendingDown, Zap, Star, Award } from 'lucide-react';
import { Recommendation } from '../types';

interface RecommendationsProps {
  recommendations: Recommendation[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'optimization':
        return <Lightbulb className="h-6 w-6" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6" />;
      case 'info':
        return <Info className="h-6 w-6" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'optimization':
        return 'glass border-green-200/50';
      case 'warning':
        return 'glass border-amber-200/50';
      case 'info':
        return 'glass border-blue-200/50';
      default:
        return 'glass border-gray-200/50';
    }
  };

  const getIconStyles = (type: string) => {
    switch (type) {
      case 'optimization':
        return 'text-green-600 bg-gradient-to-br from-green-100 to-emerald-100 border-green-200/50';
      case 'warning':
        return 'text-amber-600 bg-gradient-to-br from-amber-100 to-orange-100 border-amber-200/50';
      case 'info':
        return 'text-blue-600 bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-200/50';
      default:
        return 'text-gray-600 bg-gradient-to-br from-gray-100 to-slate-100 border-gray-200/50';
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case 'optimization':
        return 'text-green-800';
      case 'warning':
        return 'text-amber-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="glass rounded-3xl shadow-strong border border-gray-100/50 overflow-hidden backdrop-blur-xl animate-fadeInUp">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 p-8 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative flex items-center space-x-4">
          <div className="glass-dark p-3 rounded-2xl backdrop-blur-sm border border-white/30 shadow-soft">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white text-shadow-strong">Smart Recommendations</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="h-4 w-4 text-violet-200" />
              <p className="text-violet-100 text-base font-medium">AI-powered energy insights</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {recommendations.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-soft">
              <Lightbulb className="h-12 w-12 text-gray-400" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">No Recommendations Yet</h4>
            <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">Add appliances to get personalized energy-saving recommendations and insights</p>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendations.map((recommendation, index) => (
              <div
                key={recommendation.id}
                className={`border rounded-3xl p-8 transition-all duration-500 shadow-soft hover:shadow-strong card-hover ${getStyles(recommendation.type)}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start space-x-6">
                  <div className={`p-4 rounded-2xl border shadow-soft ${getIconStyles(recommendation.type)}`}>
                    {getIcon(recommendation.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-xl mb-3 ${getTextColor(recommendation.type)}`}>
                      {recommendation.title}
                    </h4>
                    <p className={`text-base mb-6 leading-relaxed ${getTextColor(recommendation.type)} opacity-90`}>
                      {recommendation.description}
                    </p>
                    {recommendation.potential_savings > 0 && (
                      <div className="flex items-center space-x-3">
                        <div className="glass rounded-2xl px-6 py-4 border border-white/50 shadow-soft backdrop-blur-sm">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <TrendingDown className="h-5 w-5 text-green-600" />
                              <IndianRupee className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="text-base font-bold text-green-700">
                              Potential monthly savings: ₹{recommendation.potential_savings.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;