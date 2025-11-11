import moment from 'moment';
import pino from 'pino';
import Environment from '../helper/constan/environment';

class LoggerPino {
  #pino;
  #id = {
    account_id: '',
  };
  #module = '';
  #path = '';

  constructor() {
    this.#module = Environment.SERVICE_NAME;
    this.#pino = pino({
      level: Environment.LOGGER_LEVEL || 'info',
      messageKey: 'log_message',
      timestamp: () => `,"timestamp":"${moment().format()}"`,
      formatters: {
        level(label) {
          return { log_level: label };
        },
        bindings() {
          return {
            business_unit: 'RJS HUB',
            programming_language: 'NODEJS',
            log_type: 'AppLog',
          };
        },
      },
    });
  }

  setIdAccount(id: string) {
    this.#id = {
      account_id: id,
    };
  }

  setPath(path: string) {
    this.#path = path;
  }

  clearId() {
    this.#id = {
      account_id: '',
    };
  }

  info(message: string) {
    const childLogger = this.#pino.child({
      request: {},
      module: this.#module,
      custom_attributes: {
        ...this.#id,
        path: this.#path,
        data: {},
      },
      err: {},
    });
    const logs = {
      log_message: message,
    };
    childLogger.info(logs);
  }

  debug({ message, data }: { message: string; data: any }) {
    const childLogger = this.#pino.child({
      request: {},
      module: this.#module,
      custom_attributes: {
        ...this.#id,
        data: data,
        path: this.#path,
      },
      err: {},
    });
    const logs = {
      log_message: message,
    };
    childLogger.debug(logs);
  }

  error({ message, error }: { message: string; error: any }) {
    const childLogger = this.#pino.child({
      request: {},
      module: this.#module,
      custom_attributes: {
        ...this.#id,
        data: {},
        path: this.#path,
      },
      err: error,
    });
    const logs = {
      log_message: message,
    };
    childLogger.error(logs);
  }
}

const logger = new LoggerPino();
export default logger;
