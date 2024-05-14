
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
  private is_valid(): boolean {
    return (Date.now() - this.cache.timestamp) < this.timeout;
  }
  private async validate() {
    if (this.is_valid()) {
      return;
    }
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
  // Get all data
  async getAll(): Promise<Array<T>> {
    await this.validate();
    return this.cache.data;
  }
  // Get single entry
  async get(key: Partial<T>): Promise<T | null> {
    await this.validate();
    return this.find(key);
  }
  abstract fetch(): Promise<Array<T>>;
  abstract find(key: Partial<T>): T | null;
}



