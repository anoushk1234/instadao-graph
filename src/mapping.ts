import { BigInt } from "@graphprotocol/graph-ts";
import { DaoFactory, tokencreated } from "../generated/DaoFactory/DaoFactory";
import { Transfer, MintCall } from "../generated/templates/InstaDao/InstaDao";
import { TokenEntity, TokenTransferEntity } from "../generated/schema";

export function handletokencreated(event: tokencreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = TokenEntity.load(event.transaction.hash.toHexString());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new TokenEntity(event.transaction.hash.toHexString());

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1);

  // Entity fields can be set based on event parameters
  entity.tokenaddress = event.params.tokenaddress;
  entity.creator = event.params.creator;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.children(...)
  // - contract.getContract(...)
}

export function handleTransfer(event: Transfer): void {
  let entity = TokenTransferEntity.load(event.transaction.hash.toHexString());

  if (!entity) {
    entity = new TokenTransferEntity(event.transaction.hash.toHexString());
    entity.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1);
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.amt = event.params.value;
  entity.save();
}

// export function handleMintCall(call: MintCall): void {
//   let entity = TokenTransferEntity.load(call.transaction.hash.toHexString());

//   if (!entity) {
//     entity = new TokenTransferEntity(call.transaction.hash.toHexString());
//   }

//   entity.save();
// }
