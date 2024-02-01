// File generated from our OpenAPI spec by Stainless.

import * as Core from 'meorphis-test-2/core';
import { APIResource } from 'meorphis-test-2/resource';
import * as StatusAPI from 'meorphis-test-2/resources/status';

export class Status extends APIResource {
  /**
   * API status check
   */
  list(options?: Core.RequestOptions): Core.APIPromise<StatusListResponse> {
    return this._client.get('/status', options);
  }
}

export interface StatusListResponse {
  message?: string;
}

export namespace Status {
  export import StatusListResponse = StatusAPI.StatusListResponse;
}
