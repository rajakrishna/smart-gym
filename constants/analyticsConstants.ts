export const REVENUE_GROWTH_CHART_COLORS = [
        'rgb(96,240,210)',    
        'rgb(199,249,238)',   
    ]; 

export const MEM_GROWTH_CHART_COLORS = [
    'rgb(130,4,1)',     // #820401
    'rgb(192,35,35)',   // #C02323
    'rgb(222,84,44)',   // #DE542C
    'rgb(239,126,50)',  // #EF7E32 
]

export const ATTENDANCE_COLORS = [
    '#142459', 
    '#176BA0', 
    '#19AADE', 
    '#1AC5E6'
];

export const GRAY_SHADES = ( ratio: number) => {
    if (ratio >= 0.75) return '#29066B'; 
    if (ratio >= 0.5) return '#7D3AC1';  
    if (ratio >= 0.25) return '#AF4BCE'; 
    return '#DB4CB2';  
}