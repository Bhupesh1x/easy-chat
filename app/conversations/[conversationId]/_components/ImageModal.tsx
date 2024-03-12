import Image from "next/image";

import Modal from "@/components/modals/Modal";

type Props = {
  src?: string | null;
  isOpen: boolean;
  onClose: () => void;
};

function ImageModal({ src, isOpen, onClose }: Props) {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-80 w-80">
        <Image fill src={src} alt="Image" className="object-cover" />
      </div>
    </Modal>
  );
}

export default ImageModal;
