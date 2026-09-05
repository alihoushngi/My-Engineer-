export function canCustomerReviewRequest(input: {
  request: {
    id: string;
    status: string;
    customerId?: string;
    expertId: string;
  };
  customerId: string;
  reviews: readonly {
    relatedRequestId?: string;
    authorCustomerId?: string;
  }[];
}): boolean {
  if (input.request.status !== "closed") {
    return false;
  }

  if (input.request.customerId !== input.customerId) {
    return false;
  }

  return !input.reviews.some(
    (review) =>
      review.relatedRequestId === input.request.id &&
      review.authorCustomerId === input.customerId,
  );
}

export function findEligibleRequestForExpert<
  T extends {
    id: string;
    status: string;
    customerId?: string;
    expertId: string;
  },
>(
  requests: readonly T[],
  reviews: readonly {
    relatedRequestId?: string;
    authorCustomerId?: string;
  }[],
  customerId: string,
  expertId: string,
): T | undefined {
  return requests.find(
    (request) =>
      request.expertId === expertId &&
      canCustomerReviewRequest({ request, customerId, reviews }),
  );
}
