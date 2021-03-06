// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class tokencreated extends ethereum.Event {
  get params(): tokencreated__Params {
    return new tokencreated__Params(this);
  }
}

export class tokencreated__Params {
  _event: tokencreated;

  constructor(event: tokencreated) {
    this._event = event;
  }

  get tokenaddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get creator(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class DaoFactory extends ethereum.SmartContract {
  static bind(address: Address): DaoFactory {
    return new DaoFactory("DaoFactory", address);
  }

  children(param0: Address): Address {
    let result = super.call("children", "children(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toAddress();
  }

  try_children(param0: Address): ethereum.CallResult<Address> {
    let result = super.tryCall("children", "children(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getContract(): Address {
    let result = super.call("getContract", "getContract():(address)", []);

    return result[0].toAddress();
  }

  try_getContract(): ethereum.CallResult<Address> {
    let result = super.tryCall("getContract", "getContract():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class CreateCall extends ethereum.Call {
  get inputs(): CreateCall__Inputs {
    return new CreateCall__Inputs(this);
  }

  get outputs(): CreateCall__Outputs {
    return new CreateCall__Outputs(this);
  }
}

export class CreateCall__Inputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get supply(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get amt(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get deci(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class CreateCall__Outputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }
}
