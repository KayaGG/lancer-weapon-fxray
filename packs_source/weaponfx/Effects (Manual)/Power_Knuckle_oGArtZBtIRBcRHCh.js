const { targetsMissed, targetTokens, sourceToken } = game.modules.get("lancer-weapon-fx").api.getMacroVariables(this);

await Sequencer.Preloader.preloadForClients([
    "jb2a.unarmed_strike.physical.02.blue",
    "modules/lancer-weapon-fxray/soundfx/knuckleswing.ogg",
    "modules/lancer-weapon-fxray/soundfx/knucklehit.ogg",
]);

let sequence = new Sequence();

for (const target of targetTokens) {
    sequence
        .effect()
            .xray()
            .file("jb2a.unarmed_strike.physical.02.blue")
            .scale(0.9)
            .atLocation(sourceToken)
            .moveTowards(target)
            .missed(targetsMissed.has(target.id));
    sequence
        .sound()
            .file("modules/lancer-weapon-fxray/soundfx/knuckleswing.ogg")
            .delay(300)
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.7));
    if (!targetsMissed.has(target.id)) {
        sequence
            .sound()
                .file("modules/lancer-weapon-fxray/soundfx/knucklehit.ogg")
                .delay(600)
                .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.8))
                .waitUntilFinished(-100);
    }
}
sequence.play();
