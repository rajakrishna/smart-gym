export interface UserValidationData {
  role_name?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  email?: string;
  phone?: string;
  user_image?: string;
  membership_plan?: string;
  stripe_customer_id?: string;
}

export interface ValidationMessage {
  field: string;
  message: string;
}

export function validateUserData(data: UserValidationData): ValidationMessage[] {
  const errors: ValidationMessage[] = [];

  // Role validation
  if (!data.role_name || !['Member', 'Admin'].includes(data.role_name.trim())) {
    errors.push({ field: 'role_name', message: 'Issue with role_name' });
  }

  // Name validations
  if (!data.full_name || data.full_name.trim() === '') {
    errors.push({ field: 'full_name', message: 'Missing full_name' });
  }
  if (!data.first_name || data.first_name.trim() === '') {
    errors.push({ field: 'first_name', message: 'Missing first_name' });
  }
  if (!data.last_name || data.last_name.trim() === '') {
    errors.push({ field: 'last_name', message: 'Missing last_name' });
  }

  // Date validation
  if (!data.date_of_birth) {
    errors.push({ field: 'date_of_birth', message: 'Missing date_of_birth' });
  }

  // Address validations
  if (!data.address || data.address.trim() === '') {
    errors.push({ field: 'address', message: 'Missing address' });
  }
  if (!data.city || data.city.trim() === '') {
    errors.push({ field: 'city', message: 'Missing city' });
  }
  if (!data.state || data.state.trim() === '') {
    errors.push({ field: 'state', message: 'Missing state' });
  }

  // Zip code validation
  if (!data.zip_code || parseInt(data.zip_code) < 10000 || parseInt(data.zip_code) > 99999) {
    errors.push({ field: 'zip_code', message: 'Invalid zip_code: must be exactly 5 digits' });
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email' });
  }

  // Phone validation
  if (!data.phone || data.phone.trim() === '') {
    errors.push({ field: 'phone', message: 'Missing phone' });
  }

  // User image validation
  if (!data.user_image || typeof data.user_image !== 'string') {
    errors.push({ field: 'user_image', message: 'Missing user_image' });
  } else {
    try {
      new URL(data.user_image);
    } catch {
      errors.push({ field: 'user_image', message: 'Invalid user_image URL' });
    }
  }

  // Membership plan validation
  if (!data.membership_plan || !['Basic', 'Standard', 'Premium'].includes(data.membership_plan.trim())) {
    errors.push({ field: 'membership_plan', message: 'Invalid membership_plan: must be Basic, Standard, or Premium' });
  }

  // Stripe customer ID validation
  if (!data.stripe_customer_id || data.stripe_customer_id.trim() === '') {
    errors.push({ field: 'stripe_customer_id', message: 'Missing stripe_customer_id' });
  }

  return errors;
}

// Helper function for individual field validations
export const fieldValidators = {
  email: (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  },

  zipCode: (zipCode: string): boolean => {
    const zip = parseInt(zipCode);
    return zip >= 10000 && zip <= 99999;
  },

  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  role: (role: string): boolean => {
    return ['Member', 'Admin'].includes(role.trim());
  },

  membershipPlan: (plan: string): boolean => {
    return ['Basic', 'Standard', 'Premium'].includes(plan.trim());
  },
};
