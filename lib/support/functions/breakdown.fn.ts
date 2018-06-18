function breakdown(variables) {
    return variables.replace(/^\[|\]$/g, '').split('][').map(vrs => vrs.split(',').map(vr => vr.trim()));
}

exports.breakdown = breakdown;