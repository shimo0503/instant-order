import Axios, { AxiosRequestConfig } from 'axios'
export const AXIOS_INSTANCE = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const customInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({ data }) => data);

    // @ts-expect-error: Promise
    promise.cancel = () => {
        source.cancel('クエリはキャンセルされました');
    };

    return promise;
};
