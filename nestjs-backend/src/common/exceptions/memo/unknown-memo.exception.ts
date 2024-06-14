import {
  BussinessStatus,
  BussinessMessage
} from '../../enums';
import { BusinessException } from '../business.exception';

export class UnknownMemoException extends BusinessException {
  constructor(
    code = BussinessStatus.NORMAL_BUSINESS_ERROR,
    message = BussinessMessage.UNKNOWN_MEMO
  ) {
    super(code, message);
  }
}
