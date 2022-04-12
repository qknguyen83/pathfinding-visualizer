class Heap {
  constructor(comparator = (a, b) => a < b) {
    this._heap = [];
    this._comparator = comparator;
  }

  top = () => {
    return this._heap[0];
  };

  size = () => {
    return this._heap.length;
  };

  push = (...values) => {
    values.forEach((value) => {
      this._heap.push(value);
      this._pushHelper(this.size() - 1);
    });
  };

  pop = () => {
    this._popHelper(0);
  };

  _parent = (i) => Math.floor((i - 1) / 2);

  _left = (i) => 2 * i + 1;

  _right = (i) => 2 * i + 2;

  _swap = (i, j) => {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  };

  _pushHelper = (idx) => {
    while (
      this._parent(idx) >= 0 &&
      this._comparator(this._heap[idx], this._heap[this._parent(idx)])
    ) {
      this._swap(idx, this._parent(idx));
      idx = this._parent(idx);
    }
  };

  _popHelper = (idx) => {
    this._swap(idx, this.size() - 1);
    this._heap.pop();

    while (
      (this._left(idx) < this.size() &&
        this._comparator(this._heap[this._left(idx)], this._heap[idx])) ||
      (this._right(idx) < this.size() &&
        this._comparator(this._heap[this._right(idx)], this._heap[idx]))
    ) {
      if (
        this._left(idx) < this.size() &&
        (this._right(idx) >= this.size() ||
          this._comparator(this._heap[this._left(idx)], this._heap[this._right(idx)]))
      ) {
        this._swap(idx, this._left(idx));
        idx = this._left(idx);
      } else if (
        this._right(idx) < this.size() &&
        (this._left(idx) >= this.size() ||
          !this._comparator(this._heap[this._left(idx)], this._heap[this._right(idx)]))
      ) {
        this._swap(idx, this._right(idx));
        idx = this._right(idx);
      }
    }
  };
}

export default Heap;
