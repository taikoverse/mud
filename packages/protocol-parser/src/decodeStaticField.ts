import { Hex, getAddress, hexToBigInt, hexToBool } from "viem";
import {
  StaticAbiType,
  StaticAbiTypeToPrimitiveType,
  staticAbiTypeToByteLength,
  staticAbiTypeToDefaultValue,
} from "./staticAbiTypes";
import { assertExhaustive } from "./assertExhaustive";
import { InvalidHexLengthError, InvalidHexLengthForStaticFieldError } from "./errors";

export function decodeStaticField<
  TAbiType extends StaticAbiType,
  TPrimitiveType extends StaticAbiTypeToPrimitiveType<TAbiType>
>(abiType: TAbiType, data: Hex): TPrimitiveType {
  if (data.length > 3 && data.length % 2 !== 0) {
    throw new InvalidHexLengthError(data);
  }

  const dataSize = (data.length - 2) / 2;
  if (dataSize !== staticAbiTypeToByteLength[abiType]) {
    throw new InvalidHexLengthForStaticFieldError(abiType, data);
  }

  switch (abiType) {
    case "uint8":
    case "uint16":
    case "uint24":
    case "uint32":
    case "uint40":
    case "uint48":
    case "uint56":
    case "uint64":
    case "uint72":
    case "uint80":
    case "uint88":
    case "uint96":
    case "uint104":
    case "uint112":
    case "uint120":
    case "uint128":
    case "uint136":
    case "uint144":
    case "uint152":
    case "uint160":
    case "uint168":
    case "uint176":
    case "uint184":
    case "uint192":
    case "uint200":
    case "uint208":
    case "uint216":
    case "uint224":
    case "uint232":
    case "uint240":
    case "uint248":
    case "uint256":
    case "int8":
    case "int16":
    case "int24":
    case "int32":
    case "int40":
    case "int48":
    case "int56":
    case "int64":
    case "int72":
    case "int80":
    case "int88":
    case "int96":
    case "int104":
    case "int112":
    case "int120":
    case "int128":
    case "int136":
    case "int144":
    case "int152":
    case "int160":
    case "int168":
    case "int176":
    case "int184":
    case "int192":
    case "int200":
    case "int208":
    case "int216":
    case "int224":
    case "int232":
    case "int240":
    case "int248":
    case "int256": {
      const value = hexToBigInt(data, { signed: abiType.startsWith("int") });
      const defaultValueType = typeof staticAbiTypeToDefaultValue[abiType];
      if (defaultValueType === "number") {
        return Number(value) as TPrimitiveType;
      }
      if (defaultValueType === "bigint") {
        return value as TPrimitiveType;
      }
      throw new Error(`Unexpected default value type (${defaultValueType}) for ABI type (${abiType})`);
    }

    case "bytes1":
    case "bytes2":
    case "bytes3":
    case "bytes4":
    case "bytes5":
    case "bytes6":
    case "bytes7":
    case "bytes8":
    case "bytes9":
    case "bytes10":
    case "bytes11":
    case "bytes12":
    case "bytes13":
    case "bytes14":
    case "bytes15":
    case "bytes16":
    case "bytes17":
    case "bytes18":
    case "bytes19":
    case "bytes20":
    case "bytes21":
    case "bytes22":
    case "bytes23":
    case "bytes24":
    case "bytes25":
    case "bytes26":
    case "bytes27":
    case "bytes28":
    case "bytes29":
    case "bytes30":
    case "bytes31":
    case "bytes32": {
      return data as TPrimitiveType;
    }

    case "bool": {
      return hexToBool(data) as TPrimitiveType;
    }

    case "address": {
      return getAddress(data) as TPrimitiveType;
    }
  }

  return assertExhaustive(abiType, `Unsupported static ABI type: ${abiType}`);
}
