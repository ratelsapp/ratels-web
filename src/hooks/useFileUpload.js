import { useMemo, useState } from "react";
import { file as fileActor, fileCanister } from "actor/index";
import { fileCanisterId, isIC } from "constants/index";
import { t } from "@lingui/macro";

const uploadChunk = async ({ batch_id, chunk, canisterId, identity }) => {
  return (canisterId ? fileCanister(canisterId, identity) : fileActor).create_chunk({
    batch_id,
    content: [...new Uint8Array(await chunk.arrayBuffer())],
  });
};

export default function useFileUpload({ canisterId, fileType }) {
  const [fileError, setFileError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [filePath, setFilePath] = useState(null);
  const [batchId, setBatchId] = useState(null);

  const fileUploadCallback = async (file, identity) => {
    if (uploading) return;

    setUploading(true);

    const actor = canisterId ? fileCanister(canisterId, identity) : fileActor();

    const { batch_id } = await actor.create_batch();

    const promises = [];

    const chunkSize = 700000;

    for (let start = 0; start < file.size; start += chunkSize) {
      const chunk = file.slice(start, start + chunkSize);

      promises.push(
        uploadChunk({
          batch_id,
          chunk,
          canisterId,
          identity,
        })
      );
    }

    const chunkIds = await Promise.all(promises).catch((err) => {
      console.log(err);
      setFileError(t`Upload failed, please try again`);
      setUploading(false);
    });

    if (!chunkIds) return;

    await actor.commit_batch({
      batch_id,
      chunk_ids: chunkIds.map(({ chunk_id }) => chunk_id),
      content_type: file.type,
    });

    setUploading(false);

    const filePath = isIC
      ? `https://${canisterId ?? fileCanisterId}.raw.ic0.app/${batch_id}`
      : `https://dtest.app/${batch_id}?canisterId=${canisterId ?? fileCanisterId}`;

    // const filePath = isIC
    //   ? `https://${canisterId ?? fileCanisterId}.raw.ic0.app/${batch_id}`
    //   : `http://localhost:8000/${batch_id}?canisterId=${canisterId ?? fileCanisterId}`;

    setFilePath(filePath);
    setBatchId(batch_id);

    return { filePath, batchId, fileType };
  };

  return useMemo(
    () => [
      {
        loading: uploading,
        error: fileError,
        data: { filePath, batchId, fileType },
      },
      fileUploadCallback,
    ],
    [uploading, filePath, batchId, fileUploadCallback, fileType]
  );
}
