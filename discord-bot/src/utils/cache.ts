
type CachedData<T> = {
  data: Array<T>
  timestamp: number
};

export abstract class Cache<T> {
  protected cache: CachedData<T>;
  protected timeout: number;
  protected name: string;
  constructor(name: string, timeout: number) {
    this.name = name;
    this.timeout = timeout;
    this.cache = {
      data: [],
      timestamp: 0,
    };
  }
  invalidate() {
    this.timeout = 0;
  }
  // set new cached value
  set(data: Array<T>) {
    // console.log(`[cache_${this.name}] SET:`, data)
    this.cache = {
      data,
      timestamp: Date.now(),
    }
  }
  // cache validator
  is_valid(): boolean {
    return (Date.now() - this.cache.timestamp) < this.timeout;
  }
  async get(key: Partial<T>): Promise<T | null> {
    if (!this.is_valid()) {
      console.log(`[cache_${this.name}] expired, fetching...`)
      // fetch new
      try {
        const data = await this.fetch();
        this.set(data);
        console.log(`[cache_${this.name}] fetched ${data.length} items.`)
      } catch (error) {
        console.warn(`[cache_${this.name}] fetch error!`, error);
        return null;
      }
    }
    return this.find(key);
  }
  abstract fetch(): Promise<Array<T>>;
  abstract find(key: Partial<T>): T | null;
}



