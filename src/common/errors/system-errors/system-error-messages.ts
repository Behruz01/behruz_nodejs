import type { MultiLanguage } from '../../interfaces/multi-language.interface';
import { Language } from '../../interfaces/multi-language.interface';
import { SystemErrorCodes } from './system-error-codes';

export const SystemErrorMessages: Record<SystemErrorCodes, MultiLanguage> = {
  [SystemErrorCodes.InternalServerError]: {
    [Language.English]: 'Internal server error',
    [Language.Russian]: 'Внутренняя ошибка сервера',
    [Language.Uzbek]: 'Server xatosi',
  },
  [SystemErrorCodes.BadRequest]: {
    [Language.English]: 'Bad request',
    [Language.Russian]: 'Неверный запрос',
    [Language.Uzbek]: 'Noto‘g‘ri so‘rov',
  },
};
