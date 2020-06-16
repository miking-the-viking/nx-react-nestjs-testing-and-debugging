export abstract class AbstractEntityTracker<EntityType> {
    constructor() {}
    public abstract async seed(...args: any[]): Promise<any>;
    public abstract async clear(model: Partial<EntityType>): Promise<unknown>;
    public abstract async purge(): Promise<unknown>;
    public abstract push(toPush: Partial<EntityType>): void;
}
