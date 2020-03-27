import { Test, TestingModule } from '@nestjs/testing';
import { DbFsService } from './db-fs.service';

describe('DbFsService', () => {
  let service: DbFsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbFsService],
    }).compile();

    service = module.get<DbFsService>(DbFsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
