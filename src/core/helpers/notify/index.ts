import { toast, ToastContent } from 'react-toastify';

const notify = (text: string): ToastContent =>
  toast(text, { className: 'error-toast', draggable: true, position: toast.POSITION.TOP_RIGHT });

export default notify;
