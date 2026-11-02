/**
 * Client testimonials. Only add genuine, verified testimonials with the client's permission.
 * The testimonials section stays hidden while this list is empty.
 */
export type Testimonial = { quote: string; name: string; context?: string };

export const testimonials: Testimonial[] = [];
