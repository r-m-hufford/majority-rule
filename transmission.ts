function detectOverlap(a: string, b: string) {
  const arr = b.trim().split(' ');
  let test = arr[0];
  let start = 0;

  // find the start point of the overlap
  for (let i = 0; i < arr.length; i++)  {
    if (a.trim().includes(arr[i])) { 
      test = arr[i];
      start = i + 1;
      break;
    }
  }

  // find the ending point of the overlap
  for (let i = start; i < arr.length; i++) {
    let temp = `${test} ${arr[i]}`;
    if (a.includes(temp)) {
      test += ' '
      test += arr[i];
    } else {
      break;
    }
  }

  // keep the beginning of the initial string
  // append contents of new string after overlap
  let index = a.indexOf(test);
  a = a.substring(0, index).trim();
  let merged = `${a} ${b.trim()}`;
  return merged;
}

function resolveInconsistencies(
  a: string, 
  counts: { [index: number]: { [x: string]: number }[] }
  ): { [index: number]: { [x: string]: number }[] } {
  const arr = a.split(' ');

  for (let i = 0; i < arr.length; i++) {
    if (counts[i]) {
      let updated = false;
      for (let e of counts[i]){
        for (let obj in e) {
          if (obj === arr[i]) {
            e[obj]++;
            updated = true;
          }
        }
      }
      if (!updated) counts[i].push({[arr[i]]: 1});
    } else {
      counts[i] = [{ [arr[i]]: 1 }];
    }
  }
  return counts;
}

function buildTranscript(counts: { [index: number]: { [x: string]: number }[] }) {
  let maxValue = 0;
  let maxKey = "";
  let transcript = "";
  
  for (let arr in counts) {
    for (let obj of counts[arr]) {
      for (let key in obj) {
        if (obj[key] >= maxValue) {
          maxValue = obj[key];
          maxKey = key;
        }
      }
    }
    transcript += maxKey + " ";
    maxValue = 0;
    maxKey = "";
  }
  return transcript;
}

export function handleTransmission(this: any, strs: string[]): string {
  let currentTranscript: string = '';
  let counts: { [index: number]: { [x: string]: number }[] } = {};

  for (let str of strs) {
    currentTranscript = detectOverlap(currentTranscript, str);
    counts = resolveInconsistencies(currentTranscript, counts)
  }

  return buildTranscript(counts);
}