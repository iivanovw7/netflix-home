module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                'useBuiltIns': 'entry',
                'corejs': '3.24'
            }
        ],
        '@babel/preset-react',
    ]
};
