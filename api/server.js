// Vercelはサーバーレス環境なので、`export`を使って関数をエクスポートする形式にします。
module.exports = (req, res) => {
    if (req.method === 'GET' && req.url === '/poll') {
        // サーバーの状態やデータに基づいてレスポンスを返す
        const data = {
            message: '最新のデータ',
            timestamp: new Date().toISOString(),
        };

        res.status(200).json(data); // データをJSON形式で返す
    } else {
        res.status(404).send('Not Found');
    }
};
