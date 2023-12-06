Array.prototype.myFlat = function(deepth) {
  let flag = deepth === undefined ? true : deepth;
  let arr = this;
  while (flag) {
    let count = arr.length;
    arr = arr.reduce((p, c) => {
      if (c instanceof Array) {
        p = p.concat(c);
      } else {
        p.push(c);
        count = count - 1;
      }
      return p;
    }, []);
    if (count === 0) {
      return arr;
    }
    if (typeof flag !== 'boolean') flag -= 1;
  }
  return arr;
};

Array.prototype.myFlat = function(deepth = 1) {
  let res = [];
  deepth--;
  for (const p of this) {
    if (Array.isArray(p) && deepth >= 0) {
      res = res.concat(p.myFlat(deepth));
    } else {
      res.push(p);
    }
  }
  return res;
};

const arr = [1, [2, 3, [4, [5]]], 1, 2, [6, 7]];
console.log(arr.myFlat());
