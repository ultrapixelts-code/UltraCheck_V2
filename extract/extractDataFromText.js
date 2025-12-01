
export default function extract(t){
  return {
    alcohol: parseFloat(t.match(/(\d+(\.\d+)?)\s*%/i)?.[1]) || null,
    volume_l: parseFloat(t.match(/(\d+(\.\d+)?)\s*l/i)?.[1]) || null,
    lot: t.match(/L ?\d+/i)?.[0] || null,
    allergens: /solfiti|sulphites/i.test(t)?['solfiti']:[],
  };
}
