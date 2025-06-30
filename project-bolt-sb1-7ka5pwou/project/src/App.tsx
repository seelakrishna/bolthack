import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ApplianceForm from './components/ApplianceForm';
import ApplianceList from './components/ApplianceList';
import EnergyOverview from './components/EnergyOverview';
import ConsumptionChart from './components/ConsumptionChart';
import Recommendations from './components/Recommendations';
import { Appliance, EnergyData, PredictionData, Recommendation } from './types';
import {
  calculateEnergyConsumption,
  generatePredictions,
  generateRecommendations,
} from './utils/calculations';

function App() {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [tariffRate, setTariffRate] = useState(6.5); // Default rate per unit (₹6.5 per unit)
  const [energyData, setEnergyData] = useState<EnergyData>({
    dailyConsumption: 0,
    monthlyConsumption: 0,
    dailyCost: 0,
    monthlyCost: 0,
  });
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [editingAppliance, setEditingAppliance] = useState<Appliance | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAppliances = localStorage.getItem('appliances');
    const savedTariffRate = localStorage.getItem('tariffRate');
    
    if (savedAppliances) {
      setAppliances(JSON.parse(savedAppliances));
    }
    if (savedTariffRate) {
      setTariffRate(parseFloat(savedTariffRate));
    }

    // Add sample appliances for demo
    if (!savedAppliances) {
      const sampleAppliances: Appliance[] = [
        {
          id: '1',
          name: 'Refrigerator',
          powerRating: 150,
          dailyUsage: 24,
          daysPerMonth: 30,
          category: 'Kitchen',
        },
        {
          id: '2',
          name: 'LED Lights',
          powerRating: 60,
          dailyUsage: 6,
          daysPerMonth: 30,
          category: 'Lighting',
        },
        {
          id: '3',
          name: 'Air Conditioner',
          powerRating: 2000,
          dailyUsage: 8,
          daysPerMonth: 25,
          category: 'Cooling/Heating',
        },
      ];
      setAppliances(sampleAppliances);
    }
  }, []);

  // Recalculate energy data when appliances or tariff changes
  useEffect(() => {
    const newEnergyData = calculateEnergyConsumption(appliances, tariffRate);
    setEnergyData(newEnergyData);
    
    const newPredictions = generatePredictions(newEnergyData.dailyConsumption);
    setPredictions(newPredictions);
    
    const newRecommendations = generateRecommendations(appliances, newEnergyData);
    setRecommendations(newRecommendations);

    // Save to localStorage
    localStorage.setItem('appliances', JSON.stringify(appliances));
    localStorage.setItem('tariffRate', tariffRate.toString());
  }, [appliances, tariffRate]);

  const addAppliance = (applianceData: Omit<Appliance, 'id'>) => {
    const newAppliance: Appliance = {
      ...applianceData,
      id: Date.now().toString(),
    };
    setAppliances(prev => [...prev, newAppliance]);
  };

  const updateAppliance = (updatedAppliance: Appliance) => {
    setAppliances(prev => 
      prev.map(appliance => 
        appliance.id === updatedAppliance.id ? updatedAppliance : appliance
      )
    );
    setEditingAppliance(null);
  };

  const deleteAppliance = (id: string) => {
    setAppliances(prev => prev.filter(appliance => appliance.id !== id));
  };

  const startEditing = (appliance: Appliance) => {
    setEditingAppliance(appliance);
  };

  const cancelEditing = () => {
    setEditingAppliance(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse float"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      </div>
      
      <Header />
      
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Energy Overview */}
          <EnergyOverview
            energyData={energyData}
            tariffRate={tariffRate}
            onTariffChange={setTariffRate}
          />

          {/* Charts */}
          <ConsumptionChart appliances={appliances} predictions={predictions} />

          {/* Appliance Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12">
              <ApplianceForm 
                onAddAppliance={addAppliance}
                editingAppliance={editingAppliance}
                onUpdateAppliance={updateAppliance}
                onCancelEdit={cancelEditing}
              />
              <ApplianceList
                appliances={appliances}
                onDeleteAppliance={deleteAppliance}
                onEditAppliance={startEditing}
              />
            </div>
            
            <Recommendations recommendations={recommendations} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;