import { Test, TestingModule } from '@nestjs/testing';
import { AssociateController } from './associate.controller';
import { AssociateService } from './associate.service';

describe('AssociateController', () => {
  let controller: AssociateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociateController],
      providers: [AssociateService],
    }).compile();

    controller = module.get<AssociateController>(AssociateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
