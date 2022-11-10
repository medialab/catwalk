import Papa from 'papaparse';
import saveAs from 'file-saver';
import YAML from 'yaml';

import cache from '../../cache';
import type {DownloadType} from '../../types';
import Modal from './Modal';
import Button from '../Button';
import InfoPin from '../InfoPin';
import {useI18nMessages} from '../../hooks';

interface DownloadModalProps {
  onClose?: () => void;
  onDownloadChoice?: (type: DownloadType) => void;
}

function downloadWithDate(document: BlobPart, downloadType: string) {
  const file = new Blob([document], {type: 'text/plain;charset=utf-8'});
  const d = new Date();
  const fileName =
    downloadType +
    '_' +
    d.toISOString() +
    (downloadType == 'model' ? '.yml' : '.csv');
  saveAs(file, fileName, true);
}

async function downloadData() {
  const rows = await cache.getRows();
  const csv = Papa.unparse(rows);
  downloadWithDate(csv, 'data');
}

async function downloadModel() {
  const config = await cache.getConfig();
  const yml = YAML.stringify(config);
  downloadWithDate(yml, 'model');
}

async function downloadEverything() {
  downloadData();
  downloadModel();
}

export default function DownloadModal({
  onDownloadChoice,
  onClose
}: DownloadModalProps) {
  const {
    downloadFooterModalTitle,
    downloadFooterModalDlData,
    downloadFooterModalDlDataHelp,
    downloadFooterModalDlModel,
    downloadFooterModalDlModelHelp,
    downloadFooterModalDlEverything,
    downloadFooterModalDlEverythingHelp,
    modalCancel
  } = useI18nMessages();

  return (
    <Modal onClose={onClose}>
      <div className="DownloadFooterModalContent">
        <h3>{downloadFooterModalTitle}</h3>
        <ul>
          <li>
            <Button onClick={downloadData}>
              <span>{downloadFooterModalDlData}</span>
              <InfoPin message={downloadFooterModalDlDataHelp} />
            </Button>
          </li>
          <li>
            <Button onClick={downloadModel}>
              <span>{downloadFooterModalDlModel}</span>
              <InfoPin message={downloadFooterModalDlModelHelp} />
            </Button>
          </li>
          <li>
            <Button onClick={downloadEverything}>
              <span>{downloadFooterModalDlEverything}</span>
              <InfoPin message={downloadFooterModalDlEverythingHelp} />
            </Button>
          </li>
          <li>
            <Button onClick={onClose}>{modalCancel}</Button>
          </li>
        </ul>
      </div>
    </Modal>
  );
}
