import { useCallback, useState } from "react";
import { api } from "../../../api";
import { message } from "antd";

export const useGetProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const getData = useCallback(async () => {
    try {
      const res = await api.getProducts();
      setData(res?.data);
    } catch (err) {
      message.open({
        type: "error",
        content: `${err?.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, data, getData];
};

export const usePostProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createData = useCallback(async (body, onSuccess) => {
    try {
      setIsLoading(true);
      await api.createProduct(body);
      onSuccess && onSuccess();
      message.open({
        type: "success",
        content: "Data baru berhasil dibuat",
      });
      setIsLoading(false);
    } catch (err) {
      message.open({
        type: "error",
        content: `${err?.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, createData];
};

export const useUpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateData = useCallback(async (id, body, onSuccess) => {
    try {
      setIsLoading(true);
      await api.updateProduct(id, body);
      onSuccess && onSuccess();
      message.open({
        type: "success",
        content: "Berhasil update data",
      });
      setIsLoading(false);
    } catch (err) {
      message.open({
        type: "error",
        content: `${err?.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, updateData];
};

export const useDeleteProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteData = useCallback(async (id, onSuccess) => {
    try {
      setIsLoading(true);
      await api.deleteProduct(id);
      onSuccess && onSuccess();
      message.open({
        type: "success",
        content: "Berhasil delete data",
      });
      setIsLoading(false);
    } catch (err) {
      message.open({
        type: "error",
        content: `${err?.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, deleteData];
};
