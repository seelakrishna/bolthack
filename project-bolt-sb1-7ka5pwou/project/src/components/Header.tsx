import React from 'react';
import { Zap, TrendingUp, Sparkles, Activity, Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse float"></div>
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-pink-300 opacity-15 rounded-full mix-blend-multiply filter blur-xl animate-pulse float-delayed"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-yellow-300 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-300 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-1000"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center space-x-6 animate-slideInLeft">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-glow"></div>
              <div className="relative bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-3xl border border-white border-opacity-30 shadow-2xl group-hover:scale-110 transition-all duration-300">
                <Zap className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg text-shadow-strong gradient-text-rainbow">
                Smart Electricity Estimator
              </h1>
              <p className="text-indigo-100 font-medium text-lg flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>AI-Powered Energy Management</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 animate-slideInRight">
            {/* Status indicators */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="glass rounded-2xl px-4 py-3 border border-white border-opacity-30 shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <Activity className="h-5 w-5 text-white" />
                  <span className="font-semibold text-white text-sm">Live Monitoring</span>
                </div>
              </div>
              
              <div className="glass rounded-2xl px-4 py-3 border border-white border-opacity-30 shadow-soft">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-emerald-300" />
                  <span className="font-semibold text-white text-sm">Smart Analytics</span>
                </div>
              </div>
            </div>
            
            {/* Mobile status */}
            <div className="md:hidden glass rounded-2xl p-3 border border-white border-opacity-30">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium text-white text-sm">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;