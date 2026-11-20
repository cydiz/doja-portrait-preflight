'use strict';
const field = id => document.getElementById(id);
function refreshBudget() {
  try {
    const {cost, remaining} = planCredits(...['balance','fast','match'].map(id => field(id).valueAsNumber));
    field('budget').textContent = remaining < 0 ? `Requires ${cost} credits. Short by ${-remaining}.` : `Requires ${cost} credits. ${remaining} left.`;
  } catch (error) { field('budget').textContent = error.message; }
}
for (const id of ['balance','fast','match']) field(id).addEventListener('input', refreshBudget);
refreshBudget();
let report;
let selection = 0;
async function inspect(file) {
  const bytes = file.size;
  if (!bytes || bytes > 10485760) return {bytes, accepted:false, reason:'Choose a nonempty file of at most 10 MiB.'};
  const h = new Uint8Array(await file.slice(0,12).arrayBuffer());
  const sig = String.fromCharCode(...h);
  let format;
  if ([137,80,78,71,13,10,26,10].every((v,i)=>h[i]===v)) format = 'PNG';
  if (h[0]===255 && h[1]===216 && h[2]===255) format = 'JPEG';
  if (sig.startsWith('RIFF') && sig.slice(8)==='WEBP') format = 'WebP';
  if (!format) return {bytes, accepted:false, reason:'Export the file as PNG, JPEG or WebP.'};
  const image = new Image();
  const url = URL.createObjectURL(file);
  try {
    image.src = url;
    await image.decode();
    const width = image.naturalWidth, height = image.naturalHeight;
    const accepted = Math.min(width,height) >= 300;
    return {format, bytes, width, height, accepted, reason:accepted?'File requirements met.':'Each side must be at least 300 pixels.'};
  } catch { return {format, bytes, accepted:false, reason:'The browser could not decode the image.'}; }
  finally { URL.revokeObjectURL(url); }
}
field('photo').onchange = async event => {
  const revision = ++selection;
  report = undefined;
  field('download').disabled = true;
  const file = event.target.files[0];
  field('result').textContent = file ? 'Checking…' : 'Choose a file.';
  if (!file) return;
  let result;
  try { result = await inspect(file); } catch { result = {accepted:false,reason:'Could not read the selected file.'}; }
  if (revision !== selection) return;
  report = result;
  field('result').textContent = [result.reason, result.width && `${result.width} × ${result.height} px`, result.format, `${file.size} bytes`].filter(Boolean).join(' · ');
  field('download').disabled = false;
};
field('download').onclick = () => {
  if (!report) return;
  const url = URL.createObjectURL(new Blob([JSON.stringify(report,null,2)], {type:'application/json'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'portrait-preflight.json';
  link.click();
  setTimeout(()=>URL.revokeObjectURL(url),30000);
};
