import { BigInt } from "@graphprotocol/graph-ts";
import { DaoFactory, tokencreated } from "../generated/DaoFactory/DaoFactory";
// import { Transfer, MintCall } from "../generated/templates/InstaDao/InstaDao";
import { TokenEntity } from "../generated/schema";

export function handletokencreated(eventOne: tokencreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entityOne = TokenEntity.load(eventOne.transaction.hash.toHexString());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entityOne) {
    entityOne = new TokenEntity(eventOne.transaction.hash.toHexString());

    // entityOne fields can be set using simple assignments
    entityOne.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  entityOne.count = entityOne.count + BigInt.fromI32(1);

  // entityOne fields can be set based on eventOne parameters
  entityOne.tokenaddress = eventOne.params.tokenaddress;
  entityOne.creator = eventOne.params.creator;
  entityOne.name = eventOne.params.name;
  entityOne.symbol = eventOne.params.symbol;

  // Entities can be written to the store with `.save()`
  entityOne.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the eventOne can be connected to
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

// export function handleTransfer(eventTwo: Transfer): void {
//   let entityTwo = new TokenTransferEntity(eventTwo.transaction.hash.toHex());

//   if (!entityTwo) {
//     entityTwo = new TokenTransferEntity(eventTwo.transaction.hash.toHex());
//     entityTwo.count = BigInt.fromI32(0);
//   }

//   // BigInt and BigDecimal math are supported
//   entityTwo.count = entityTwo.count + BigInt.fromI32(1);
//   // entityTwo.from = eventTwo.params.from;
//   entityTwo.to = eventTwo.params.to.toHexString();
//   entityTwo.amt = eventTwo.params.value;
//   entityTwo.save();
// }

// // export function handleMintCall(call: MintCall): void {
// //   let entity = TokenTransferEntity.load(call.transaction.hash.toHexString());

// //   if (!entity) {
// //     entity = new TokenTransferEntity(call.transaction.hash.toHexString());
// //   }

// //   entity.save();
// // }
