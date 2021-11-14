/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface BootcampInterface extends ethers.utils.Interface {
  functions: {
    "createCourse(string)": FunctionFragment;
    "getImplementationAddress()": FunctionFragment;
    "location()": FunctionFragment;
    "name()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createCourse",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getImplementationAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "location", values?: undefined): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "createCourse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getImplementationAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "location", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "CourseCreated(address,string)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CourseCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class Bootcamp extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: BootcampInterface;

  functions: {
    createCourse(
      _courseCID: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "createCourse(string)"(
      _courseCID: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getImplementationAddress(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getImplementationAddress()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    location(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "location()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    name(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "name()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    owner(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "owner()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  createCourse(
    _courseCID: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "createCourse(string)"(
    _courseCID: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getImplementationAddress(overrides?: CallOverrides): Promise<string>;

  "getImplementationAddress()"(overrides?: CallOverrides): Promise<string>;

  location(overrides?: CallOverrides): Promise<string>;

  "location()"(overrides?: CallOverrides): Promise<string>;

  name(overrides?: CallOverrides): Promise<string>;

  "name()"(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    createCourse(
      _courseCID: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "createCourse(string)"(
      _courseCID: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getImplementationAddress(overrides?: CallOverrides): Promise<string>;

    "getImplementationAddress()"(overrides?: CallOverrides): Promise<string>;

    location(overrides?: CallOverrides): Promise<string>;

    "location()"(overrides?: CallOverrides): Promise<string>;

    name(overrides?: CallOverrides): Promise<string>;

    "name()"(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    CourseCreated(courseAddress: null, courseCID: null): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;
  };

  estimateGas: {
    createCourse(_courseCID: string, overrides?: Overrides): Promise<BigNumber>;

    "createCourse(string)"(
      _courseCID: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getImplementationAddress(overrides?: CallOverrides): Promise<BigNumber>;

    "getImplementationAddress()"(overrides?: CallOverrides): Promise<BigNumber>;

    location(overrides?: CallOverrides): Promise<BigNumber>;

    "location()"(overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    "name()"(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createCourse(
      _courseCID: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "createCourse(string)"(
      _courseCID: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getImplementationAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getImplementationAddress()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    location(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "location()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "name()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
