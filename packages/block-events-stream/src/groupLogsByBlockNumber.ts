import { BlockNumber, Hex, Log } from "viem";
import { NonPendingLog, isNonPendingLog } from "./isNonPendingLog";
import { bigIntSort } from "./utils";
import { isDefined } from "@latticexyz/common/utils";

export function groupLogsByBlockNumber<TLog extends Log>(
  logs: TLog[]
): { blockNumber: BlockNumber; blockHash: Hex; events: NonPendingLog<TLog>[] }[] {
  // Pending logs don't have block numbers, so filter them out.
  const nonPendingLogs = logs.filter(isNonPendingLog);
  if (logs.length !== nonPendingLogs.length) {
    console.warn(
      "pending logs discarded",
      logs.filter((log) => !isNonPendingLog(log))
    );
  }

  const blockNumbers = Array.from(new Set(nonPendingLogs.map((log) => log.blockNumber)));
  blockNumbers.sort(bigIntSort);

  return blockNumbers
    .map((blockNumber) => {
      const blockLogs = nonPendingLogs.filter((log) => log.blockNumber === blockNumber);
      if (!blockLogs.length) return;
      blockLogs.sort((a, b) => (a.logIndex < b.logIndex ? -1 : a.logIndex > b.logIndex ? 1 : 0));

      if (!blockLogs.length) return;

      return {
        blockNumber,
        blockHash: blockLogs[0].blockHash,
        events: blockLogs,
      };
    })
    .filter(isDefined);
}
