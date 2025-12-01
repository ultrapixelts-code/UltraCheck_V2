
export const rules = [
 {code:'ALCOHOL', check:d=>d.alcohol!=null, message:'Titolo alcolometrico'},
 {code:'VOLUME', check:d=>d.volume_l!=null, message:'Volume nominale'},
 {code:'LOT', check:d=>!!d.lot, message:'Lotto'},
];
