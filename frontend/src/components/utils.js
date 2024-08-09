// utils.js
export const prepareChartData = (rf_predictions, xgb_predictions, descriptions) => {
  if (!rf_predictions || !xgb_predictions) {
    console.error('Missing predictions data');
    return [];
  }
  return Object.keys(rf_predictions).map(key => ({
    name: key,
    RF: parseFloat(rf_predictions[key].toFixed(2)),
    XGB: parseFloat(xgb_predictions[key].toFixed(2)),
    description: descriptions[key] || ''
  }));
};

export const prepareCostChartData = (rf_cost_predictions, xgb_cost_predictions, descriptions) => {
  if (!rf_cost_predictions || !xgb_cost_predictions) {
    console.error('Missing cost predictions data');
    return [];
  }
  return Object.keys(rf_cost_predictions).map(key => ({
    name: key,
    RF: parseFloat(rf_cost_predictions[key].toFixed(2)),
    XGB: parseFloat(xgb_cost_predictions[key].toFixed(2)),
    description: descriptions[key] || ''
  }));
};
export const groupsManual = {
  'BA1 BUILDING ANALYTICS': ['BA01'],
  'BD1 BONDING': ['BD01'],
  'CP COMPUTER': ['CP01', 'CP02', 'CP03', 'CP04', 'CP05',  'CP07'],
  'DA DAMPER ACTUATORS': ['DA01', 'DA03'],
  'DC DISTECH CONTROLS': ['DC01',
    'DC02',
    'DC03',
    'DC04',
    'DC05',
    'DC06',
    'DC07',
    'DC08',
    'DC09'],
  'DT DETECTOR': ['DT02',
    'DT05',
    'DT06',
    'DT07',
    'DT08',
    'DT09'],
  'EN1 ENCLOSURES': ['EN01'],
  'FB1 PANEL FAB MATERIALS': ['FB01'],
  'HS HUMIDITY SENSORS (RH)': ['HS01', 'HS02', 'HS04'],
  'IM INSTALLATION MATERIAL': ['IM01'],
  'MD MOTORS AND DRIVES': [ 'MD02'],
  'MG1 METERS/GAUGES': ['MG01'],
  'SB SUB-CONTRACTORS': ['SB01', 'SB04'],
  'SE SECURITY': ['SE01',
    'SE10',
    'SE11',
    'SE12',
    'SE04',
    'SE05',
    'SE06',
    'SE07',
    'SE08',],
  'SS SWITCHES/SIGNAL': ['SS01'],
  'ST STATS': ['ST01', 'ST02', 'ST03'],
  'SW SWITCHES/CONTROLLER': ['SW01', 'SW02', 'SW03', 'SW04', 'SW05', 'SW06'],
  'SX STRUXUREWARE': ['SX01', 'SX02', 'SX03', 'SX04', 'SX05', 'SX06'],
  'TC TRANSDUCERS/CONTROLLER': ['TC01', 'TC02', 'TC03', 'TC04', 'TC05'],
  'TD TRIDIUM/JACE': ['TD01', 'TD02', 'TD03'],
  'TR TRANSDUCER/SIGNAL': ['TR01', 'TR02', 'TR03'],
  'TS TEMPERATURE SENSORS': ['TS01', 'TS02', 'TS03', 'TS04'],
  'VL VALVES': ['VL01', 'VL02'],
  'WI1 WIRE': ['WI01'],
};

export const descriptions = {
  'BA01': 'Building analytics',
  'BD01': 'Bonding',
  'CP01': 'Workstation',
  'CP02': 'Software',
  'CP03': 'Printer',
  'CP04': 'Battery back-up/ups',
  'CP05': 'Server',
  'CP07': 'Network switch',
  'DA01': 'Electric',
  'DA03': 'Endswitch',
  'DT02': 'Leak (water)',
  'DT05': 'Tank level',
  'DT06': 'Co2 - carbon dioxide',
  'DT07': 'Alarm module',
  'DT08': 'Carbon monoxide',
  'DT09': 'Methane sensor',
  'EN01': 'Enclosures',
  'FB01': 'Panel fab materials',
  'HO02': 'Design',
  'HO03': 'Fabrication',
  'HO04': 'Programming - control',
  'HO05': 'Project mgmt',
  'HO06': 'Training',
  'HO07': 'Programming - frontend',
  'HO08': 'Pneumatic',
  'HO09': 'Controls technician',
  'HO10': 'Electrical technician',
  'HO11': 'Other labor',
  'HO12': 'Start up',
  'HS01': 'Humudity Space',
  'HS02': 'Humudity Duct',
  'HS04': 'Humudity Outdoor',
  'IM01': 'Electric',
  'MD02': 'VFD Drives',
  'MG01': 'Meters/gauges',
  'SB01': 'Electricians',
  'SB04': 'Miscellaneous',
  'SE01': 'Camera',
  'SE04': 'Maglock',
  'SE05': 'Door strike',
  'SE06': 'Software',
  'SE07': 'Software upgrade',
  'SE08': 'Card readers',
  'SE10': 'Miscellaneous',
  'SE11': 'Aiphone equipment',
  'SE12': 'Door contacts, pirs',
  'SS01': 'RIB Relay',
  'ST01': 'Freezestat',
  'ST02': 'Aquastat',
  'ST03': 'Thermostat',
  'DC01': 'Apex',
  'DC02': 'S1000 master controller',
  'DC03': 'I/O module',
  'DC04': 'Controller',
  'DC05': 'ECY - VAV controller',
  'DC06': 'Space sensors',
  'DC07': 'Thermostat',
  'DC08': 'Software',
  'DC09': 'Jace - Distech',
  'SW01': 'Duct static',
  'SW02': 'Current',
  'SW03': 'Water pressure',
  'SW04': 'Fan status (air dp)',
  'SW05': 'Filter status - air flow',
  'SW06': 'Water flow',
  'SX01': 'As',
  'SX02': 'Server software (es, rs)',
  'SX03': 'Power supply',
  'SX04': 'I/o module',
  'SX05': 'Mpc controller',
  'SX06': 'Mpv VAV controller',
  'TC01': 'Duct static transducer',
  'TC02': 'Water pressure transducer',
  'TC03': 'Steam pressure transducer',
  'TC04': 'Current',
  'TC05': 'Air flow - (AFMS)',
  'TD01': 'SE Jace',
  'TD02': 'Tridium software',
  'TD03': 'Tridium miscellaneous',
  'TR01': 'Current to pneumatic (i/p)',
  'TR02': 'Elec. to pneumatic (i/p)',
  'TR03': 'Pneumatic to elec. (p/e)',
  'TS01': 'SE space sensor',
  'TS02': 'Duct sensor',
  'TS03': 'Immersion - water',
  'TS04': 'OAT',
  'VL01': 'Valve - Electrical',
  'VL02': 'Valve - Pneumatic',
  'WI01': 'Wire',};
