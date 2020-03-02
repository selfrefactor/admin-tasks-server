import { WordProfileService } from './word-profile.service';
import { WordProfile } from '../interfaces/word-profile.interface';
export declare class WordProfileController {
    private dbModel;
    constructor(dbModel: WordProfileService);
    createInstance(toSave: WordProfile): Promise<WordProfile>;
    removeInstance(removeFilter: Object): Promise<string>;
    fi(): Promise<string>;
    bar(): Promise<string>;
}
