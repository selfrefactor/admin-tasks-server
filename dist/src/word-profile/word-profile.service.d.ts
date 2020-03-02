import { Model } from 'mongoose';
import { WordProfile } from '../interfaces/word-profile.interface';
export declare class WordProfileService {
    private readonly wordProfileModel;
    constructor(wordProfileModel: Model<WordProfile>);
    create(toCreate: WordProfile): Promise<WordProfile>;
    remove(removeFilter: Object): Promise<any>;
    find(word: string): Promise<WordProfile>;
    findAll(): Promise<string>;
    sk(): void;
}
