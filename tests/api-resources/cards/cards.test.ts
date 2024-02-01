// File generated from our OpenAPI spec by Stainless.

import MeorphisTest2 from 'meorphis-test-2';
import { Response } from 'node-fetch';

const meorphisTest2 = new MeorphisTest2({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource cards', () => {
  test('create: only required params', async () => {
    const responsePromise = meorphisTest2.cards.create({ type: 'VIRTUAL' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await meorphisTest2.cards.create({
      type: 'VIRTUAL',
      account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      card_program_token: '00000000-0000-0000-1000-000000000000',
      carrier: { qr_code_url: 'string' },
      digital_card_art_token: '00000000-0000-0000-1000-000000000000',
      exp_month: '06',
      exp_year: '2027',
      memo: 'New Card',
      pin: 'string',
      product_id: '1',
      shipping_address: {
        first_name: 'Michael',
        last_name: 'Bluth',
        line2_text: 'The Bluth Company',
        address1: '5 Broad Street',
        address2: 'Unit 25A',
        city: 'NEW YORK',
        state: 'NY',
        postal_code: '10001-1809',
        country: 'USA',
        email: 'johnny@appleseed.com',
        phone_number: '+12124007676',
      },
      shipping_method: 'STANDARD',
      spend_limit: 1000,
      spend_limit_duration: 'TRANSACTION',
      state: 'OPEN',
      'Idempotency-Key': 'string',
    });
  });

  test('retrieve', async () => {
    const responsePromise = meorphisTest2.cards.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      meorphisTest2.cards.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(MeorphisTest2.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = meorphisTest2.cards.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('provision', async () => {
    const responsePromise = meorphisTest2.cards.provision('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
