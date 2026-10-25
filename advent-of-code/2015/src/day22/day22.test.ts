import "@puzzles/utils";
import { test, describe, expect } from "vitest";
import { readTestData } from "@puzzles/utils";
import {
	applySpells,
	Boss,
	castNamedSpell,
	Character,
	display,
	exampleFunction,
	Player,
	SpellName,
	spells,
} from "./day22";

const dayNumber = "22";
describe(`day ${dayNumber}`, () => {
	test("sample", () => {
		const player: Player = {
			hitPoints: 10,
			armour: 0,
			specialArmour: 0,
			mana: 250,
			spells: [],
		};

		const boss: Boss = {
			hitPoints: 13,
			damage: 8,
		};

		var playerTurn = true;

		const playersTurns = ["Poison", "Magic Missile"].reverse();

		while (player.hitPoints > 0 && boss.hitPoints > 0) {
			console.log(" ");
			console.log(playerTurn ? "Player Turn" : "Boss Turn");
			display(player, boss);
			applySpells(player, boss);
			if (playerTurn) {
				castNamedSpell(player, boss, playersTurns.pop() as SpellName);
			} else {
				const playerDamage = boss.damage - (player.armour + player.specialArmour);
				player.hitPoints = player.hitPoints - Math.max(1, playerDamage);
			}
			playerTurn = !playerTurn;
		}
	});

	test("sample2 ", () => {
		const player: Player = {
			hitPoints: 10,
			armour: 0,
			specialArmour: 0,
			mana: 250,
			spells: [],
		};

		const boss: Boss = {
			hitPoints: 14,
			damage: 8,
		};

		var playerTurn = true;

		const playersTurns = ["Recharge", "Shield", "Drain", "Poison", "Magic Missile"].reverse();

		while (player.hitPoints > 0 && boss.hitPoints > 0) {
			console.log(" ");
			console.log(playerTurn ? "Player Turn" : "Boss Turn");
			display(player, boss);
			applySpells(player, boss);
			if (playerTurn) {
				castNamedSpell(player, boss, playersTurns.pop() as SpellName);
			} else {
				const playerDamage = boss.damage - (player.armour + player.specialArmour);
				player.hitPoints = player.hitPoints - Math.max(1, playerDamage);
			}
			playerTurn = !playerTurn;
		}
	});
});
