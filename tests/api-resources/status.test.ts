// File generated from our OpenAPI spec by Stainless.

import MeorphisTest2 from 'meorphis-test-2';
import { Response } from 'node-fetch';

const meorphisTest2 = new MeorphisTest2({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource status', () => {
  test('list', async () => {
    const responsePromise = meorphisTest2.status.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(meorphisTest2.status.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      MeorphisTest2.NotFoundError,
    );
  });
});
