/**
 * Convert dataUrl to Blob.
 *
 * @param {string} dataUrl The dataUrl.
 * @param {string} [type] The optional MIME type. If not specified, the MIME type from the data URL will be used.
 * @returns {Blob}
 */
export declare function dataUrl2Blob(dataUrl: string, type?: string): Blob;
