import { Appliance, EnergyData, PredictionData, Recommendation } from '../types';

export const calculateEnergyConsumption = (
  appliances: Appliance[],
  tariffRate: number
): EnergyData => {
  const dailyConsumption = appliances.reduce((total, appliance) => {
    return total + (appliance.powerRating * appliance.dailyUsage) / 1000; // Convert to Units (kWh)
  }, 0);

  const monthlyConsumption = appliances.reduce((total, appliance) => {
    return total + ((appliance.powerRating * appliance.dailyUsage) / 1000) * appliance.daysPerMonth;
  }, 0);

  const dailyCost = dailyConsumption * tariffRate;
  const monthlyCost = monthlyConsumption * tariffRate;

  return {
    dailyConsumption,
    monthlyConsumption,
    dailyCost,
    monthlyCost,
  };
};

export const generatePredictions = (
  currentConsumption: number,
  days: number = 7
): PredictionData[] => {
  const predictions: PredictionData[] = [];
  const baseConsumption = currentConsumption;
  
  for (let i = 1; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Simple prediction with some variance
    const seasonalFactor = 1 + 0.1 * Math.sin((date.getMonth() / 12) * 2 * Math.PI);
    const randomVariance = 0.9 + Math.random() * 0.2;
    const predicted = baseConsumption * seasonalFactor * randomVariance;
    
    predictions.push({
      date: date.toISOString().split('T')[0],
      predicted: Math.round(predicted * 100) / 100,
    });
  }
  
  return predictions;
};

export const generateRecommendations = (
  appliances: Appliance[],
  energyData: EnergyData
): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // Find high consumption appliances (considering days per month)
  const highConsumptionAppliances = appliances
    .map(appliance => ({
      ...appliance,
      monthlyConsumption: ((appliance.powerRating * appliance.dailyUsage) / 1000) * appliance.daysPerMonth,
    }))
    .filter(appliance => appliance.monthlyConsumption > 50)
    .sort((a, b) => b.monthlyConsumption - a.monthlyConsumption);

  if (highConsumptionAppliances.length > 0) {
    const topConsumer = highConsumptionAppliances[0];
    const potentialSavings = (topConsumer.powerRating * 2 * 6.5 / 1000) * topConsumer.daysPerMonth;
    recommendations.push({
      id: 'high-consumption',
      type: 'optimization',
      title: `Optimize ${topConsumer.name} Usage`,
      description: `Your ${topConsumer.name} consumes ${topConsumer.monthlyConsumption.toFixed(1)} units monthly (used ${topConsumer.daysPerMonth} days). Consider reducing daily usage by 2 hours to save approximately ₹${potentialSavings.toFixed(2)} monthly.`,
      potential_savings: potentialSavings,
    });
  }

  // Check for appliances used less frequently
  const infrequentAppliances = appliances.filter(appliance => appliance.daysPerMonth < 20);
  if (infrequentAppliances.length > 0) {
    const appliance = infrequentAppliances[0];
    recommendations.push({
      id: 'infrequent-usage',
      type: 'info',
      title: `Seasonal Usage Detected`,
      description: `${appliance.name} is used only ${appliance.daysPerMonth} days per month. Consider energy-efficient alternatives for occasional use appliances.`,
      potential_savings: 0,
    });
  }

  // Check for peak hour usage
  if (energyData.dailyConsumption > 15) {
    recommendations.push({
      id: 'peak-hours',
      type: 'warning',
      title: 'High Peak Hour Usage',
      description: 'Consider shifting non-essential appliance usage to off-peak hours (11 PM - 6 AM) to reduce costs.',
      potential_savings: energyData.monthlyCost * 0.15,
    });
  }

  // Energy efficiency tip
  recommendations.push({
    id: 'efficiency-tip',
    type: 'info',
    title: 'Energy Efficiency Tip',
    description: 'Switch to LED bulbs and unplug devices when not in use. This can reduce your electricity bill by 10-15%.',
    potential_savings: energyData.monthlyCost * 0.12,
  });

  return recommendations;
};

export const getApplianceCategories = () => [
  'Kitchen',
  'Lighting',
  'Entertainment',
  'Cooling/Heating',
  'Laundry',
  'Computing',
  'Bathroom',
  'Security',
  'Garden/Outdoor',
  'Other',
];

export const getTypicalPowerRatings = () => ({
  // Kitchen Appliances
  'Refrigerator': 150,
  'Freezer': 200,
  'Microwave': 1000,
  'Oven': 2500,
  'Dishwasher': 1800,
  'Coffee Maker': 800,
  'Toaster': 1200,
  'Blender': 300,
  'Food Processor': 400,
  'Electric Kettle': 1500,
  'Rice Cooker': 700,
  'Slow Cooker': 200,
  'Air Fryer': 1400,
  'Garbage Disposal': 500,
  'Electric Stove': 3000,
  'Induction Cooktop': 1800,
  'Stand Mixer': 300,
  'Juicer': 400,
  'Electric Grill': 1500,
  'Bread Maker': 600,

  // Lighting
  'LED Bulb': 10,
  'CFL Bulb': 15,
  'Incandescent Bulb': 60,
  'Halogen Bulb': 50,
  'Fluorescent Tube': 40,
  'Ceiling Fan Light': 75,
  'Chandelier': 200,
  'Track Lighting': 150,
  'Under Cabinet Lights': 30,
  'Outdoor Security Light': 100,

  // Entertainment
  'Television (LED 32")': 100,
  'Television (LED 55")': 150,
  'Television (OLED 65")': 200,
  'Sound System': 200,
  'Gaming Console': 150,
  'DVD/Blu-ray Player': 25,
  'Cable/Satellite Box': 30,
  'Home Theater System': 400,
  'Projector': 300,
  'Streaming Device': 5,

  // Cooling/Heating
  'Air Conditioner (Window)': 1200,
  'Air Conditioner (Central)': 3500,
  'Portable AC': 1000,
  'Space Heater': 1500,
  'Electric Fireplace': 1400,
  'Heat Pump': 2500,
  'Ceiling Fan': 75,
  'Tower Fan': 50,
  'Exhaust Fan': 30,
  'Dehumidifier': 600,
  'Humidifier': 50,

  // Laundry
  'Washing Machine': 500,
  'Dryer (Electric)': 3000,
  'Dryer (Gas)': 300,
  'Iron': 1200,
  'Steamer': 1000,
  'Washer-Dryer Combo': 2000,

  // Computing
  'Desktop Computer': 300,
  'Laptop': 65,
  'Monitor (24")': 50,
  'Monitor (32")': 80,
  'Printer (Inkjet)': 30,
  'Printer (Laser)': 600,
  'Router/Modem': 15,
  'External Hard Drive': 10,
  'Scanner': 25,
  'UPS Battery Backup': 50,

  // Bathroom
  'Hair Dryer': 1500,
  'Hair Straightener': 200,
  'Electric Toothbrush': 2,
  'Bathroom Fan': 50,
  'Electric Shaver': 15,
  'Heated Towel Rail': 100,
  'Bathroom Heater': 1200,

  // Water Heating
  'Water Heater (Electric)': 4000,
  'Tankless Water Heater': 3000,
  'Hot Water Recirculation Pump': 100,

  // Security & Safety
  'Security Camera': 10,
  'Alarm System': 20,
  'Motion Sensor Light': 15,
  'Smoke Detector': 1,
  'Video Doorbell': 5,

  // Garden/Outdoor
  'Pool Pump': 1500,
  'Hot Tub': 3500,
  'Electric Lawn Mower': 1200,
  'Leaf Blower': 800,
  'String Trimmer': 500,
  'Outdoor Lighting': 100,
  'Garage Door Opener': 350,
  'Electric Car Charger': 7200,
  'Pressure Washer': 1800,

  // Miscellaneous
  'Vacuum Cleaner': 1200,
  'Robot Vacuum': 30,
  'Sewing Machine': 100,
  'Aquarium Equipment': 150,
  'Electric Blanket': 100,
  'Space Heater (Small)': 750,
  'Dehumidifier (Small)': 300,
  'Air Purifier': 50,
  'Humidifier (Large)': 100,
  'Electric Fireplace Insert': 1500,
});

export const getAppliancesByCategory = () => {
  const ratings = getTypicalPowerRatings();
  const categories = getApplianceCategories();
  
  const categorizedAppliances: Record<string, string[]> = {};
  
  categories.forEach(category => {
    categorizedAppliances[category] = [];
  });

  // Categorize appliances
  Object.keys(ratings).forEach(appliance => {
    if (appliance.includes('Refrigerator') || appliance.includes('Microwave') || appliance.includes('Oven') || 
        appliance.includes('Dishwasher') || appliance.includes('Coffee') || appliance.includes('Toaster') ||
        appliance.includes('Blender') || appliance.includes('Food') || appliance.includes('Kettle') ||
        appliance.includes('Rice') || appliance.includes('Slow') || appliance.includes('Air Fryer') ||
        appliance.includes('Garbage') || appliance.includes('Stove') || appliance.includes('Cooktop') ||
        appliance.includes('Mixer') || appliance.includes('Juicer') || appliance.includes('Grill') ||
        appliance.includes('Bread') || appliance.includes('Freezer')) {
      categorizedAppliances['Kitchen'].push(appliance);
    } else if (appliance.includes('Bulb') || appliance.includes('Light') || appliance.includes('Chandelier') ||
               appliance.includes('Track') || appliance.includes('Tube') || appliance.includes('Cabinet')) {
      categorizedAppliances['Lighting'].push(appliance);
    } else if (appliance.includes('Television') || appliance.includes('Sound') || appliance.includes('Gaming') ||
               appliance.includes('DVD') || appliance.includes('Cable') || appliance.includes('Theater') ||
               appliance.includes('Projector') || appliance.includes('Streaming')) {
      categorizedAppliances['Entertainment'].push(appliance);
    } else if (appliance.includes('Air Conditioner') || appliance.includes('Heater') || appliance.includes('Fan') ||
               appliance.includes('Heat Pump') || appliance.includes('Fireplace') || appliance.includes('Dehumidifier') ||
               appliance.includes('Humidifier') || appliance.includes('AC')) {
      categorizedAppliances['Cooling/Heating'].push(appliance);
    } else if (appliance.includes('Washing') || appliance.includes('Dryer') || appliance.includes('Iron') ||
               appliance.includes('Steamer') || appliance.includes('Washer')) {
      categorizedAppliances['Laundry'].push(appliance);
    } else if (appliance.includes('Computer') || appliance.includes('Laptop') || appliance.includes('Monitor') ||
               appliance.includes('Printer') || appliance.includes('Router') || appliance.includes('Hard Drive') ||
               appliance.includes('Scanner') || appliance.includes('UPS')) {
      categorizedAppliances['Computing'].push(appliance);
    } else if (appliance.includes('Hair') || appliance.includes('Toothbrush') || appliance.includes('Shaver') ||
               appliance.includes('Towel') || appliance.includes('Bathroom')) {
      categorizedAppliances['Bathroom'].push(appliance);
    } else if (appliance.includes('Security') || appliance.includes('Alarm') || appliance.includes('Motion') ||
               appliance.includes('Smoke') || appliance.includes('Doorbell')) {
      categorizedAppliances['Security'].push(appliance);
    } else if (appliance.includes('Pool') || appliance.includes('Hot Tub') || appliance.includes('Lawn') ||
               appliance.includes('Leaf') || appliance.includes('Trimmer') || appliance.includes('Outdoor') ||
               appliance.includes('Garage') || appliance.includes('Car Charger') || appliance.includes('Pressure')) {
      categorizedAppliances['Garden/Outdoor'].push(appliance);
    } else {
      categorizedAppliances['Other'].push(appliance);
    }
  });

  return categorizedAppliances;
};