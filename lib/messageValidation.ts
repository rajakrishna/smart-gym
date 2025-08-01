export interface MessageValidationData {
  user_id?: string;
  type?: string;
  title?: string;
  body?: string;
  delivery_method?: string;
}

export interface ValidationMessage {
  field: string;
  message: string;
}

export function validateMessageData(data: MessageValidationData): ValidationMessage[] {
  const errors: ValidationMessage[] = [];

  if (!data.user_id || data.user_id.trim() === '') {
    errors.push({ field: 'user_id', message: 'Missing user_id' });
  }

  if (!data.type || data.type.trim() === '') {
    errors.push({ field: 'type', message: 'Missing type' });
  }

  if (!data.title || data.title.trim() === '') {
    errors.push({ field: 'title', message: 'Missing title' });
  }

  if (!data.body || data.body.trim() === '') {
    errors.push({ field: 'body', message: 'Missing body' });
  }

  if (!data.delivery_method || data.delivery_method.trim() === '') {
    errors.push({ field: 'delivery_method', message: 'Missing delivery_method' });
  }

  return errors;
}

export const fieldValidators = {
  user_id: (user_id: string): boolean => {
    if (!user_id) return false;
    const userIdUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return userIdUuid.test(user_id);
  },

  type: (type: string): boolean => {
    if (!type) return false;
    const message_type = ['class reminder', 'class cancellation', 'general', 'administrative', 'invoice'];
    return message_type.includes(type.trim());
  },
};
